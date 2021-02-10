public with sharing class AnswersController {

    @AuraEnabled(cacheable=true)
    public static List<Answer__c> getAnswers(){
 
        return [SELECT Id, Name, Question__c FROM Answer__c];
  
    }
}
