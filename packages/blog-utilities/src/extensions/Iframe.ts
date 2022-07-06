import { Node } from "@tiptap/core";

export interface IframeOptions {
    /**
     * Iframe source url
     */
    src: string;
    /**
     * Allow iframe to go full screen
     */
    allowFullscreen?: boolean;
    /**
     * Height of iframe
     */
    height?: number;
    /**
     * Width of iframe
     */
    width?: number | string;
    /**
     * Additional html attributes for iframe
     */
    HTMLAttributes?: {
        [key: string]: any;
    };
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        iframe: {
            /**
             * Add an iframe
             */
            addIframe: (options: IframeOptions) => ReturnType;
        };
    }
}

const Iframe = Node.create<Omit<IframeOptions, "src">>({
    name: "iframe",

    group: "block",

    draggable: true,

    atom: true,

    addOptions() {
        /**
         * Default options
         */
        return {
            allowFullscreen: true,
            height: 340,
            width: 560,
            HTMLAttributes: {
                class: "iframe-wrapper"
            }
        };
    },

    addAttributes() {
        return {
            src: {
                default: null
            },
            height: {
                default: this.options.height
            },
            width: {
                default: this.options.width
            },
            frameborder: {
                default: 0
            },
            allowfullscreen: {
                default: this.options.allowFullscreen
            }
        };
    },

    parseHTML() {
        return [
            {
                tag: "iframe"
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["div", this.options.HTMLAttributes, ["iframe", HTMLAttributes]];
    },

    addCommands() {
        return {
            addIframe:
                (options: IframeOptions) =>
                ({ tr, dispatch }) => {
                    const { selection } = tr;

                    const node = this.type.create(options);

                    if (dispatch) {
                        tr.replaceRangeWith(selection.from, selection.to, node);
                    }

                    return true;
                }
        };
    }
});

export default Iframe;
export { Iframe };
