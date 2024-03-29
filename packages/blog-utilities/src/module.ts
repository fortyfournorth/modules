import { generateHTML } from "@tiptap/html";
import { mergeAttributes } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Iframe } from "./extensions/Iframe";

/**
 * Generates an HTML string from a passed JSON record
 *
 * This function assumes that the JSON record created is a valid TipTap JSON output
 *
 * @param json A JSON record passed to the function
 * @returns An HTML string
 */

export const generateHtmlFromJson: (json: Record<string, any>) => string = (json) => {
    try {
        return generateHTML(json, [
            StarterKit,
            Color,
            Iframe.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        style: {
                            default: ""
                        }
                    };
                }
            }),
            Image.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        style: {
                            default: ""
                        },
                        figCaption: {
                            default: ""
                        }
                    };
                },
                renderHTML({ HTMLAttributes }) {
                    const { style, src, alt, title, figCaption } = HTMLAttributes;
                    return [
                        "figure",
                        { style },
                        ["img", mergeAttributes(this.options.HTMLAttributes, { src, alt, title })],
                        ["figcaption", "", figCaption]
                    ];
                }
            }),
            Link,
            TextAlign.configure({
                alignments: ["left", "center", "right"],
                types: ["heading", "paragraph"]
            }),
            TextStyle,
            Underline
        ]);
    } catch (e) {
        throw e;
    }
};
