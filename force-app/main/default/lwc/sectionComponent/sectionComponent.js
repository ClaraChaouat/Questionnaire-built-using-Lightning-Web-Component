import { LightningElement, api } from 'lwc'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import saveQuestionnaireAnswers from '@salesforce/apex/SaveAnswers.saveQuestionnaireAnswers'

export default class SectionComponent extends LightningElement {
  @api questions

  @api isFirst
  @api isIntermediate
  @api isLast

  isDisabled = true
  isDisabledLastQuestion = true

  @api activeSection
  selectedOptions = {}
  @api questionsActive
  activeSectionSelectedOptions

  handleClickFinal () {
    var allQuestions = []
    var allAnswers = []

    for (let curKey of Object.keys(this.selectedOptions)) {
      let innerDictionary = this.selectedOptions[curKey]
      for (let curKey2 of Object.keys(innerDictionary)) {
        allQuestions.push(curKey2)
        allAnswers.push(innerDictionary[curKey2])
      }
    }

    saveQuestionnaireAnswers({
      allQuestions: allQuestions,
      allAnswers: allAnswers
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleClickNext () {
    this.activeSection = Number(this.activeSection) + 1
    const selectedEvent = new CustomEvent('nextpage', {
      detail: this.activeSection
    })
    this.dispatchEvent(selectedEvent)
    this.isDisabled = true
    this.isDisabledLastQuestion = true
  }

  retrieveSelectedOption (event) {
    if (this.selectedOptions[event.detail.sectionNumber]) {
      innerDictionary = this.selectedOptions[event.detail.sectionNumber]
    } else {
      var innerDictionary = {}
    }

    innerDictionary[event.detail.id] = event.detail.selectedOption
    this.selectedOptions[event.detail.sectionNumber] = innerDictionary
    this.activeSectionSelectedOptions = this.selectedOptions[this.activeSection]

    if (
      Object.keys(this.activeSectionSelectedOptions).length ==
      this.questions.length
    ) {
      this.isDisabled = false
      this.isDisabledLastQuestion = false
    } else {
      this.isDisabled = true
    }
  }

  handleClickPrevious () {
    this.activeSection = Number(this.activeSection) - 1
    const previousSection = new CustomEvent('previouspage', {
      detail: this.activeSection
    })
    this.dispatchEvent(previousSection)
    this.isDisabled = false
    this.isDisabledLastQuestion = false
  }

  showToast (title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    })
    this.dispatchEvent(evt)
  }
}
