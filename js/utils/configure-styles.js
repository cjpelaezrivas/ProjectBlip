export function toggleRunButton(isRunning) {
    $("#b_run").removeClass("hello");
    $("#b_run").removeClass("running");
    $("#b_run_hourglass_icon").removeClass("running");

    if (isRunning) {
        $("#b_run").addClass("running");
        $("#b_run_hourglass_icon").addClass("running");
    }
}
