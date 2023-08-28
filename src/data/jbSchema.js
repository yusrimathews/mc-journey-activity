const jbSchema = {
  schema: [
    {
      key: "Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.Entity_ID",
      name: "Entity_ID",
      type: "Text",
      length: 500,
      default: null,
      isNullable: null,
      isPrimaryKey: null
    },
    {
      key: "Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.Email",
      name: "Email",
      type: "EmailAddress",
      length: 254,
      default: null,
      isNullable: true,
      isPrimaryKey: null
    },
    {
      key: "Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.Mobile",
      name: "Mobile",
      type: "Phone",
      length: 50,
      default: null,
      isNullable: true,
      isPrimaryKey: null
    },
    {
      key: "Event.DEAudience-ee51a166-8c63-2436-fcf8-91c30358bee1.Field Name",
      name: "Field Name",
      type: "Text",
      length: 50,
      default: null,
      isNullable: true,
      isPrimaryKey: null
    }
  ]
}

module.exports = jbSchema;
