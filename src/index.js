import _ from 'lodash';
import mParticle from '@mparticle/web-sdk';
import mixpanelKit from '@mparticle/web-mixpanel-kit';
import Adobe from '@mparticle/web-adobe-client-kit';
import MediaSession from '@mparticle/web-media-sdk';


function myIdentityCallback(result) {
   console.log(result);
   console.log("mParticle loaded!");
}

var mParticleConfig = {
   isDevelopmentMode: true,
   identifyRequest: {
      userIdentities: {}
   },
   identityCallback: myIdentityCallback
};

Adobe.register(mParticleConfig);
mixpanelKit.register(mParticleConfig);
window.mParticle.init("API_KEY", mParticleConfig);

/* Media SDK Functions */ 
var mediaSessionStart = function (){
	window.mediaSession = new MediaSession(
	    window.mParticle,             // mParticle SDK Instance
	    '1234567',                    // Custom media ID
	    'Funny Internet cat video',   // Custom media Title
	    120000,                       // Duration in milliseconds
	    'Video',                      // Content Type (Video or Audio)
	    'OnDemand',                   // Stream Type (OnDemand, Live, etc.)
	    true						  // Log media events as custom events
	);
	window.mediaSession.logMediaSessionStart();
	window.mediaSession.logPlay();
}

var pauseMedia = function(){
	if(window.mediaSession){
		mediaSession.logPause();
	}else{
		console.log('No media session in progress');
	}
}

var playMedia = function(){
	if(window.mediaSession){
		mediaSession.logPlay();
	}else{
		console.log('No media session in progress');
	}
}

var startAdBreak = function(){
	if(window.mediaSession){
		mediaSession.logAdBreakStart({
		  id: '123456',
		  title: 'pre-roll',
		  duration: 6000
		});
	}else{
		console.log('No media session in progress');
	}
}

var startAd = function(){
	if(window.mediaSession){
		mediaSession.logAdStart({
		  id: '4423210',
		  advertiser: "Mom's Friendly Robot Company",
		  title: 'What?! Nobody rips off my kids but me!',
		  campaign: 'MomCorp Galactic Domination Plot 3201',
		  duration: 60000,
		  creative: 'A Fishful of Dollars',
		  siteid: 'moms',
		  placement: 0
		});
	}else{
		console.log('No media session in progress');
	}
}

var adEnd = function(){
	if(window.mediaSession){
		mediaSession.logAdEnd();
	}else{
		console.log('No media session in progress');
	}
}

var adSkip = function(){
	if(window.mediaSession){
		mediaSession.logAdSkip();
	}else{
		console.log('No media session in progress');
	}
}

var endAdBreak = function(){
	if(window.mediaSession){
		mediaSession.logAdBreakEnd();
	}else{
		console.log('No media session in progress');
	}
}

var startSegment = function(){
	if(window.mediaSession){
		mediaSession.logSegmentStart();
	}else{
		console.log('No media session in progress');
	}
}

var endSegment = function(){
	if(window.mediaSession){
		mediaSession.logSegmentEnd();
	}else{
		console.log('No media session in progress');
	}
}

var skipSegment = function(){
	if(window.mediaSession){
		mediaSession.logSegmentSkip();
	}else{
		console.log('No media session in progress');
	}
}

var mediaSessionEnd = function(){
	if(window.mediaSession){
		mediaSession.logMediaEnd();
		mediaSession.logMediaSessionEnd();
	}else{
		console.log('No media session in progress');
	}
}

/* UI Build functions */ 
function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'Media SDK!'], ' ');

  return element;
}

function addButton(buttonName, onClickFunction){
	var element = document.createElement('button');
	element.innerHTML = _.join([buttonName], ' ');
	element.onclick = onClickFunction;
	return element;
}

document.body.appendChild(component());
document.body.appendChild(addButton("Start Media", mediaSessionStart));
document.body.appendChild(addButton("Pause", pauseMedia));
document.body.appendChild(addButton("Play", playMedia));
document.body.appendChild(addButton("Start Ad Break", startAdBreak));
document.body.appendChild(addButton("Start Ad", startAd));
document.body.appendChild(addButton("Skip Ad", adSkip));
document.body.appendChild(addButton("End Ad", adEnd));
document.body.appendChild(addButton("End Ad Break", endAdBreak));
document.body.appendChild(addButton("Start Segment", startSegment));
document.body.appendChild(addButton("End Segment", endSegment));
document.body.appendChild(addButton("End Media", mediaSessionEnd));
