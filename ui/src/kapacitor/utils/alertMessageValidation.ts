import _ from 'lodash'
import {RULE_MESSAGE_TEMPLATE_TEXTS} from 'src/kapacitor/constants'

const isValidTemplate = (template: string): boolean => {
  const exactMatch = !!_.find(RULE_MESSAGE_TEMPLATE_TEXTS, t => t === template)
  const fieldsRegex = /(index .Fields ".+")/
  const tagsRegex = /(index .Tags ".+")/
  const fuzzyMatch = fieldsRegex.test(template) || tagsRegex.test(template)
  return exactMatch || fuzzyMatch
}

const isValidMessage = (message: string): boolean => {
  const malformedTemplateRegexp = RegExp('(({{)([^{}]*)(})([^}]*))') // matches {{*} where star does not contain '{' or '}'

  if (malformedTemplateRegexp.test(message)) {
    return false
  }

  const templateRegexp = /((?:{{)([^{}]*)(?:}}))/g // matches {{*}} where star does not contain '{' or '}'
  const matches = []
  let match = templateRegexp.exec(message)
  while (match) {
    matches[matches.length] = match[2].trim()
    match = templateRegexp.exec(message)
  }
  return _.every(matches, m => isValidTemplate(m))
}

export default isValidMessage
