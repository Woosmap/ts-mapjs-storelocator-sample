type IconType = "icon" | "selectedIcon";

interface RuleOptions {
    selected?: boolean;
    types?: Array<string>;
}

interface StyledIcon {
    icon: woosmap.map.Icon;
    type?: string;
}

export default class Styler {
    private style: woosmap.map.Style;

    constructor(style: woosmap.map.Style) {
        this.style = style;
    }

    getIconType(options: RuleOptions): IconType {
        if (options.selected) {
            return "selectedIcon";
        } else {
            return "icon";
        }
    }

    getStyledIcon(options: RuleOptions = {}): StyledIcon {
        let matchedIcon: StyledIcon;
        const iconType: IconType = this.getIconType(options);
        const defaultIcon = this.style.default[iconType];

        if (defaultIcon !== undefined) {
            matchedIcon = {icon: defaultIcon};
        } else {
            matchedIcon = {icon: this.style.default.icon};
        }

        if (options.types !== undefined && this.style.rules) {
            for (const rule of this.style.rules) {
                for (const type of options.types) {
                    const ruleIcon = rule[iconType];
                    if (rule.type === type) {
                        if (ruleIcon) {
                            return {icon: ruleIcon, type};
                        }
                    }
                }
            }
        }

        return matchedIcon;
    }
}
