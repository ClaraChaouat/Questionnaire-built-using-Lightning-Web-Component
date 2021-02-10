import { api, LightningElement } from 'lwc'

export default class QuestionTile extends LightningElement {
  @api question
  @api allSelectedOptions

  selectedOption

  get options () {
    if (this.question.Answers__r) {
      let optionsValues = []
      for (let i = 0; i < this.question.Answers__r.length; i++) {
        optionsValues.push({
          label: this.question.Answers__r[i].Name,
          value: this.question.Answers__r[i].Id
        })
      }
      return optionsValues
    } else {
      return false
    }
  }

  handleChange (event) {
    this.selectedOption = event.detail.value

    const selectedEventBis = new CustomEvent('fireselectedoption', {
      detail: {
        selectedOption: this.selectedOption,
        id: this.question.Id,
        sectionNumber: this.question.Questionnaire_Section__c
      }
    })
    this.dispatchEvent(selectedEventBis)
  }

  get valueSelected () {
    if (this.allSelectedOptions) {
      innerDictionary = this.allSelectedOptions[
        this.question.Questionnaire_Section__c
      ]
    } else {
      var innerDictionary = {}
      return ''
    }

    if (innerDictionary) {
      return innerDictionary[this.question.Id]
    } else {
      return ''
    }
  }
}
