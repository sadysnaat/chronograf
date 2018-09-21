import React, {SFC, ChangeEvent} from 'react'
import classnames from 'classnames'
import isValidMessage from 'src/kapacitor/utils/alertMessageValidation'

import {AlertRule} from 'src/types'

interface Props {
  rule: AlertRule
  updateMessage: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const RuleMessageText: SFC<Props> = ({rule, updateMessage}) => {
  const isValid = isValidMessage(rule.message)
  const textAreaClass = isValid ? 'form-malachite' : 'form-volcano'
  return (
    <div className="rule-builder--message">
      <textarea
        className={`form-control input-sm monotype ${textAreaClass}`}
        onChange={updateMessage}
        placeholder="Example: {{ .ID }} is {{ .Level }} value: {{ index .Fields &quot;value&quot; }}"
        value={rule.message}
        spellCheck={false}
      />
      {rule.message ? (
        <div className="query-editor--status">
          <span
            className={classnames('query-status-output', {
              'query-status-output--error': !isValid,
              'query-status-output--success': isValid,
            })}
          >
            <span
              className={classnames('icon', {
                stop: !isValid,
                checkmark: isValid,
              })}
            />
            {isValid
              ? 'Alert message is syntactically correct.'
              : 'Please correct templates in alert message.'}
          </span>
        </div>
      ) : null}
    </div>
  )
}

export default RuleMessageText
