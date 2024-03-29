using { cuid, managed } from '@sap/cds/common'; 

namespace fullstack_dev_challenge; 

entity Tests: managed, cuid { 
  title: String;
  description: String;
  questions: Association to many Questions
  on questions.test = $self;
} 

entity Questions: cuid { 
  text: String;
  test: Association to Tests;
  answer: Composition of Answers;
} 

aspect Answers: cuid { 
  text: String;
} 
