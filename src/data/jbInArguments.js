const jbInArguments = [
  {"sample_input": "Sample input"},
  {"dynamic_select": "{{Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.\"Field Name\"}}"},
  {"optional_text": "Optional input {{Contact.Key}}"},
  {"other_text": "Other input {{Event.DEAudience-ee51a166-8c63-2436-fcf8-000000000000.Incorrect}}"}
]

module.exports = jbInArguments;
