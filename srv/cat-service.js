import cds from "@sap/cds";

class DevChallengeService extends cds.ApplicationService {

    init() {
        const { Tests, Questions } = this.entities;
        const castArray = value => Array.isArray(value) ? value : [value];

        const updateQuestion = async (id, testID) => {
            await UPDATE.entity(Questions, id).set({test_ID: testID});
        };

        this.on('assignQuestionsToTest', async (req) => {
            const questionsCount = req.data.questionsCount;
            const testID = req.params ? req.params[0].ID : '';
            if (!testID) {
                req.error({
                    code: 500,
                    message: 'No Test ID',
                });
            }

            if (!questionsCount || questionsCount < 1) {
                req.error({
                    code: 500,
                    message: 'questionsCount must greter than 0',
                });
            }

            const result = await SELECT.from(Questions).where({test_ID: null});
            const nullQuestions = castArray(result);
            if (nullQuestions) {
                let assignAble = 0;
                let remaining = 0;
                let partial = false;

                if (nullQuestions.length < questionsCount) {
                    assignAble = nullQuestions.length;
                    remaining = questionsCount - assignAble;
                    partial = true;
                } else {
                    assignAble = questionsCount;
                }

                nullQuestions.forEach((question, index) => {
                    if (index >= assignAble) {
                        return;
                    }
                    // assign a question to the test
                    updateQuestion(question.ID, testID);
                })
                const msg = partial ? `There are only ${assignAble} available and were added to the test, there are ${remaining} questions need to be created` : `${assignAble} questions successfully added to the test`
                return msg;
            }
            return "There is no question available, please create new question then repeat this action again";
        })

        return super.init();
    }
}

export default DevChallengeService;