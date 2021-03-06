
import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupportt} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const Lang = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Commands: t.number,
        LineComment: t.lineComment,
        Args: t.string,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "%"}
  }
})

export function context() {
  return new LanguageSupport(contextLang)
}
