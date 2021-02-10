public with sharing class SaveAnswers {
        @AuraEnabled
        //public static String saveQuestionnaireAnswers(List<String> questionsSubmitted, List<String> answersSubmitted){
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

// public class SaveAnswers {
//     public static void SaveQuestionnaireAnswers() {

//         Questions_for__c newQuestionsForQuestionnaire = new Questions_for__c(
//             Question__c ='Where do you live?',
//             Answers__c='Somewhere over the rainbow!');
        
//         Create the parent reference.
//         Used only for foreign key reference
//         and doesn't contain any other fields.
//         Questionnaire__c questionnaireReference = new Questionnaire__c(
//             MyExtID__c='SAP111111');                
//             newQuestionsForQuestionnaire.Questionnaire__c = questionnaireReference;
        
//         Create the Account object to insert.
//         Same as above but has Name field.
//         Used for the insert.
//         Questionnaire__c parentQuestionnaire = new Questionnaire__c(
//             Name='New questionnaire',
//             MyExtID__c='SAP111111');      
        
//         Create the account and the opportunity.
//         Database.SaveResult[] results = Database.insert(new SObject[] {
//             parentQuestionnaire,  newQuestionsForQuestionnaire });
        
//         Check results.
//         for (Integer i = 0; i < results.size(); i++) {
//             if (results[i].isSuccess()) {
//             System.debug('Successfully created ID: '
//                   + results[i].getId());
//             } else {
//             System.debug('Error: could not create sobject '
//                   + 'for array element ' + i + '.');
//             System.debug('   The error reported was: '
//                   + results[i].getErrors()[0].getMessage() + '\n');
//             }
//         }
//     }
// }

// public class SaveAnswers {
//          public static void saveQuestionnaireAnswers(){

//             Questionnaire__c questionR = new Questionnaire__c(Name = 'New questionnaire');
//             insert questionR;
//             Questions_for__c questions = new Questions_for__c( Question__c  = 'Where do you live?',  questionR = questionR.Id);
//             insert questions;
//          }


// }