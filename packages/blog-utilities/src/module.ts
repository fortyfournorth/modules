import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

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
            Image,
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
