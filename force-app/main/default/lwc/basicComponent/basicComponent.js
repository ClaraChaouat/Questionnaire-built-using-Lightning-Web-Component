import { LightningElement, wire } from 'lwc'
import getQuestions from '@salesforce/apex/Questions.getQuestions'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

export default class BasicComponent extends LightningElement {
  questions
  sections
  lastSectionValue
  isDisabled

  activeSection = 1

  curCustomerType = 'New Private Customer'

  @wire(getQuestions, { customerType: '$curCustomerType' })
  loadQuestions ({ error, data }) {
    if (error) {
      this.showToast('ERROR', error.body.message, 'error')
    } else if (data) {
      this.questions = data

      let sectionNumbers = new Set()
      for (var question of this.questions) {
        sectionNumbers.add(question.Questionnaire_Section__c)
      }

      this.sections = []
      for (var sectionNumber of sectionNumbers) {
        var section = {
          id: sectionNumber,
          value: sectionNumber,
          label: 'Step ' + sectionNumber
        }
        this.sections.push(section)
      }
      this.lastSectionValue = sectionNumber
    }
  }

  stepChosenByButtonHandler (event) {
    this.activeSection = String(event.detail)
  }

  get activeQuestions () {
    if (this.questions) {
      const result = this.questions.filter(
        question => question.Questionnaire_Section__c == this.activeSection
      )
      return result
    } else {
      return false
    }
  }
  get getActiveSection () {
    return this.activeSection
  }

  get isLastSection () {
    if (this.activeSection == this.lastSectionValue) {
      return true
    } else {
      return false
    }
  }

  get isFirstSection () {
    if (this.activeSection == 1) {
      return true
    } else {
      return false
    }
  }

  get isIntermediate () {
    if (
      this.activeSection != 1 &&
      this.activeSection != this.lastSectionValue
    ) {
      return true
    } else {
      return false
    }
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
