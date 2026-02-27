export { BaseElement } from './primitives/index.js';

export { PIXEL_FONT, textToGrid } from './primitives/pixel-font.js';
export { sparklineToGrid, barToGrid, compositeGrids } from './primitives/pixel-renderers.js';

export { TERMINAL_TAG_MAP, escapeTerminalHtml, parseColorTags, linkifyUrls, renderTerminalText } from './primitives/terminal-parser.js';
export type { TerminalAdapter, CommandHandler, TerminalMode, TerminalHint } from './primitives/terminal-types.js';
export { commandHandlerContext } from './primitives/terminal-context.js';

export { BhAvatar } from './atoms/avatar/index.js';
export type { AvatarSize } from './atoms/avatar/index.js';

export { BhBadge } from './atoms/badge/index.js';
export type { BadgeVariant, BadgeSize } from './atoms/badge/index.js';

export { BhButton } from './atoms/button/index.js';
export type { ButtonVariant, ButtonSize } from './atoms/button/index.js';

export { BhCheckbox } from './atoms/checkbox/index.js';

export { BhDivider } from './atoms/divider/index.js';
export type { DividerSpacing } from './atoms/divider/index.js';

export { BhIcon } from './atoms/icon/index.js';
export type { IconSize } from './atoms/icon/index.js';

export { BhInput } from './atoms/input/index.js';
export type { InputSize } from './atoms/input/index.js';

export { BhLed } from './atoms/led/index.js';
export type { LedColor, LedSize } from './atoms/led/index.js';

export { BhLink } from './atoms/link/index.js';
export type { LinkVariant } from './atoms/link/index.js';

export { BhProgress } from './atoms/progress/index.js';
export type { ProgressSize, ProgressVariant } from './atoms/progress/index.js';

export { BhRadio } from './atoms/radio/index.js';

export { BhSelect } from './atoms/select/index.js';
export type { SelectSize, SelectOption, SelectOptionGroup } from './atoms/select/index.js';

export { BhSkeleton } from './atoms/skeleton/index.js';
export type { SkeletonVariant } from './atoms/skeleton/index.js';

export { BhSpinner } from './atoms/spinner/index.js';
export type { SpinnerSize } from './atoms/spinner/index.js';

export { BhSwitch } from './atoms/switch/index.js';

export { BhText } from './atoms/text/index.js';
export type { TextVariant } from './atoms/text/index.js';

export { BhTextarea } from './atoms/textarea/index.js';
export type { TextareaSize, TextareaResize } from './atoms/textarea/index.js';

export { BhTooltip } from './atoms/tooltip/index.js';
export type { TooltipPlacement } from './atoms/tooltip/index.js';

export { BhPixelDisplay } from './atoms/pixel-display/index.js';

export { BhSegmentDisplay } from './atoms/segment-display/index.js';
export type { SegmentColor, SegmentSize } from './atoms/segment-display/index.js';

export { BhSlider } from './atoms/slider/index.js';

export { BhTerminalCursor } from './atoms/terminal-cursor/index.js';
export type { CursorShape } from './atoms/terminal-cursor/index.js';

export { BhCard } from './molecules/card/index.js';
export type { CardVariant, CardPadding } from './molecules/card/index.js';

export { BhChip } from './molecules/chip/index.js';
export type { ChipVariant, ChipSize } from './molecules/chip/index.js';

export { BhFormField } from './molecules/form-field/index.js';

export { BhNavItem } from './molecules/nav-item/index.js';

export { BhTable } from './molecules/table/index.js';
export type { TableColumn, TableVariant, TableDensity } from './molecules/table/index.js';

export { BhPixelPanel } from './molecules/pixel-panel/index.js';
export { PixelDataController } from './molecules/pixel-panel/index.js';
export type { PixelDataType, PixelDataControllerOptions } from './molecules/pixel-panel/index.js';
export { animatePixels } from './molecules/pixel-panel/index.js';
export type { PixelTransition, AnimatePixelsOptions } from './molecules/pixel-panel/index.js';

export { BhSectionHeader } from './molecules/section-header/index.js';

export { BhDataTable } from './organisms/data-table/index.js';
export type { DataTableColumn, DataTableVariant, DataTableDensity, SortDirection } from './organisms/data-table/index.js';

export { BhTab, BhTabBar, BhTabPanel, BhTabs } from './organisms/tabs/index.js';

export { BhAppShell } from './organisms/shell/index.js';
export { BhActivityBar } from './organisms/shell/index.js';
export { BhActivityItem } from './organisms/shell/index.js';
export { BhSidebarPanel } from './organisms/shell/index.js';
export { BhStatusBar } from './organisms/shell/index.js';

export { BhPanelHeader } from './molecules/panel-header/index.js';

export { BhToolbar } from './molecules/toolbar/index.js';
export type { ToolbarGap, ToolbarVariant } from './molecules/toolbar/index.js';

export { BhAccordion, BhAccordionItem } from './molecules/accordion/index.js';

export { BhTerminalBar } from './molecules/terminal-bar/index.js';
export { BhTerminalInput } from './molecules/terminal-input/index.js';
export { BhTerminalHintBar } from './molecules/terminal-hint-bar/index.js';

export { BhTree, BhTreeItem } from './organisms/tree/index.js';

export { BhCommandPalette } from './organisms/overlays/index.js';
export type { CommandPaletteItem } from './organisms/overlays/index.js';
export { BhContextMenu } from './organisms/overlays/index.js';
export type { ContextMenuItem } from './organisms/overlays/index.js';

export { BhTerminal } from './organisms/terminal/index.js';

export type { LayoutGap, LayoutAlign, LayoutJustify } from './layout/index.js';
export { BhStack } from './layout/index.js';
export { BhCluster } from './layout/index.js';
export { BhRepel } from './layout/index.js';
export { BhCenter } from './layout/index.js';
export { BhReel } from './layout/index.js';
export { BhCover } from './layout/index.js';
export { BhGrid } from './layout/index.js';
export { BhSplit } from './layout/index.js';
export { BhSwitcher } from './layout/index.js';
