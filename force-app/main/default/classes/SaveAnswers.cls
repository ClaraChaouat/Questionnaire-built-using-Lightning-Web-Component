public with sharing class SaveAnswers {
        @AuraEnabled
        public static String saveQuestionnaireAnswers(List<String> allQuestions, List<String> allAnswers){

                Questionnaire__c questionR = new Questionnaire__c(Name='New Questionnaire', Contact__c='0033N00000PiEfaQAF');
                insert questionR;

                List <Questions_for__c> Q4Qs = new  List <Questions_for__c>();
                for (Integer i=0; i<allQuestions.size(); i++){
                        System.debug(i);
                        Questions_for__c quest = new Questions_for__c(
                                Question__c = allQuestions[i],
                                Answers__c = allAnswers[i],
                                Questionnaire__c = questionR.id);
                        Q4Qs.add(quest);
                }
                insert Q4Qs;

                return 'Success';         
        }
}
