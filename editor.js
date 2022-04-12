import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { parser } from "./context.js";
import {LanguageSupport,
  LRLanguage,
  foldNodeProp,
  foldInside,
  indentNodeProp,
} from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";
import { completeFromList } from "@codemirror/autocomplete";


let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Identifier: t.variableName,
      Boolean: t.bool,
      String: t.string,
      LineComment: t.lineComment,
      "( )": t.paren,
    }),
    indentNodeProp.add({
      Application: (context) =>
        context.column(context.node.from) + context.unit,
    }),
    foldNodeProp.add({
      Application: foldInside,
    }),
  ],
});

const exampleLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: { line: ";" },
  },
});

function context() {
  return new LanguageSupport(exampleLanguage, [exampleCompletion])
}
const exampleCompletion = exampleLanguage.data.of({
  autocomplete: completeFromList([
    { label: "defun", type: "keyword" },
    { label: "defvar", type: "keyword" },
    { label: "let", type: "keyword" },
    { label: "cons", type: "function" },
    { label: "car", type: "function" },
    { label: "cdr", type: "function" },
  ]),
});
let editor = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup,context()],
  }),
  parent: document.body,
});
