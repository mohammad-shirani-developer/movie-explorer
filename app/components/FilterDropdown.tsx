"use client";

import { useEffect, useId, useRef, useState } from "react";

type DropdownOption = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  /** Also used by a visible <label htmlFor>: the trigger is a real <button>, which is a labelable element. */
  id?: string;
  /** Accessible name for trigger + listbox; omit when a visible label points at the trigger. */
  ariaLabel?: string;
  value: string;
  options: ReadonlyArray<DropdownOption>;
  onChange: (value: string) => void;
  /** Extra classes for the trigger button (width tweaks etc.). */
  triggerClassName?: string;
};

const triggerBaseClasses =
  "flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-white/10 dark:bg-panel dark:text-white";

const selectedOptionClasses =
  "bg-brand/10 font-medium text-brand dark:bg-brand/20 dark:text-brand-bright";
const activeOptionClasses = "bg-gray-100 dark:bg-white/5";
const idleOptionClasses = "text-gray-700 dark:text-gray-300";

/* Panel caps: max-h-72 (288px) in roomy viewports, but never taller than
   the free space it opens into, and never collapsed to nothing. */
const PANEL_MAX_HEIGHT = 288;
const MIN_USABLE_HEIGHT = 200;
const PANEL_GAP = 8;

/* Rough rendered height of the full list: ~40px per row + container padding. */
const estimatePanelHeight = (optionCount: number) =>
  optionCount * 40 + 12;

/**
 * Themed listbox dropdown that replaces native <select> elements. The OS
 * renders native select popups, so they ignore the site theme and appear
 * wherever the browser decides; this panel is anchored to the trigger
 * (opens below it, or above when the viewport space below is too tight),
 * which keeps its position consistent on every platform.
 *
 * Keyboard model (combobox-button pattern): focus stays on the trigger
 * while open; the highlighted option is exposed via aria-activedescendant.
 * ArrowUp/Down/Home/End move, Enter/Space commit, Escape/Tab close,
 * outside pointer-down closes.
 */
const FilterDropdown = ({
  id,
  ariaLabel,
  value,
  options,
  onChange,
  triggerClassName,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState({
    up: false,
    maxHeight: PANEL_MAX_HEIGHT,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listboxId = useId();
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selectedLabel = options[selectedIndex]?.label ?? "";

  /* Close when clicking/tapping anywhere outside the dropdown. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  /* Keep the highlighted option visible while arrowing through the list. */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    listRef.current
      ?.querySelector(`#${CSS.escape(`${listboxId}-${activeIndex}`)}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, isOpen, listboxId]);

  const openDropdown = () => {
    setActiveIndex(selectedIndex);

    /* The panel always hangs directly under the trigger and simply scrolls
       when the list is longer than the room below. It only flips above the
       trigger when the space below is genuinely unusable (near the bottom
       of the viewport) AND there is more room above — so its position is
       predictable instead of the OS's native-popup roulette. */
    const rect = triggerRef.current?.getBoundingClientRect();
    let up = false;
    let maxHeight = PANEL_MAX_HEIGHT;

    if (rect) {
      const needed = estimatePanelHeight(options.length);
      const spaceBelow = window.innerHeight - rect.bottom - PANEL_GAP;
      const spaceAbove = rect.top - PANEL_GAP;

      if (
        spaceBelow < Math.min(needed, MIN_USABLE_HEIGHT) &&
        spaceAbove > spaceBelow
      ) {
        up = true;
        maxHeight = Math.max(160, Math.min(PANEL_MAX_HEIGHT, spaceAbove));
      } else {
        maxHeight = Math.max(160, Math.min(PANEL_MAX_HEIGHT, spaceBelow));
      }
    }

    setPlacement({ up, maxHeight });
    setIsOpen(true);
  };

  const commitOption = (index: number) => {
    const option = options[index];

    if (option) {
      onChange(option.value);
    }

    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!isOpen) {
      if (
        event.key === "ArrowDown" ||
        event.key === "ArrowUp" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        openDropdown();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commitOption(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        id={id}
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={`${triggerBaseClasses}${triggerClassName ? ` ${triggerClassName}` : ""}`}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          aria-activedescendant={`${listboxId}-${activeIndex}`}
          style={{ maxHeight: placement.maxHeight }}
          className={`absolute left-0 z-50 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white p-1.5 shadow-xl dark:border-white/10 dark:bg-panel ${
            placement.up ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li
                key={option.value}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commitOption(index)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? selectedOptionClasses
                    : isActive
                      ? activeOptionClasses
                      : idleOptionClasses
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
