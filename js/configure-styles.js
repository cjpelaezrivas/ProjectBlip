export function mostrar() {
    console.log("Pasa...");
}

export function permutePlayPauseButtons(isPlaying) {

    $("#b_play").removeClass("hello");

    $("#b_play").hide();
    $("#b_pause").hide();

    if (isPlaying) {
        $("#b_pause").show();
    } else {
        $("#b_play").show();
    }
}