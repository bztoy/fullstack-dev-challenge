sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'fullstackdevchallenge/test/integration/FirstJourney',
		'fullstackdevchallenge/test/integration/pages/TestsList',
		'fullstackdevchallenge/test/integration/pages/TestsObjectPage'
    ],
    function(JourneyRunner, opaJourney, TestsList, TestsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('fullstackdevchallenge') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheTestsList: TestsList,
					onTheTestsObjectPage: TestsObjectPage
                }
            },
            opaJourney.run
        );
    }
);