public with sharing class Questions {
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestions(String customerType){
        // list<API Name>
        // In the request : FIELD NAME
        if(String.isEmpty(customerType)){
            return [SELECT Id, Name, Question_Number__c, Questionnaire_Section__c, Customer_Type_As_String__c,
                (SELECT Id, Name FROM Answers__r) // Change the API name; add an "s" at the end of the name + replace __c by __r
                FROM Question__c
                ORDER BY Customer_Type_As_String__c, Questionnaire_Section__c, Question_Number__c];
        } else{
            return [SELECT Id, Name, Question_Number__c, Questionnaire_Section__c,
                    Customer_Type_As_String__c,
                    (SELECT Id, Name FROM Answers__r)
                    FROM  Question__c
                    WHERE Customer_Type__c =: customerType
                    ORDER BY Customer_Type_As_String__c, Questionnaire_Section__c, Question_Number__c];
      
        }     
    }
}