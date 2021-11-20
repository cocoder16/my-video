/**
 * VideoProgress Element
 * @param {number} videoTotalTime video total time
 * @param {number} initialCurrentTime video initial current time
 * @return {Element} element which can controller event for playing or paused
 */
export default function VideoProgress(videoTotalTime, initialCurrentTime) {
  // init DOM
  const videoProgress = document.createElement("li");
  const progress = document.createElement("progress");
  const timePoint = document.createElement("span");

  videoProgress.appendChild(progress);
  progress.appendChild(timePoint);

  videoProgress.className = "video-progress";
  progress.className = "video-total-time";
  timePoint.className = "video-time-point";

  progress.setAttribute("value", initialCurrentTime);
  progress.setAttribute("max", videoTotalTime);

  // set property
  videoProgress.progress = progress;
  videoProgress.timePoint = timePoint;
  videoProgress.step = 1;

  return videoProgress;
}
