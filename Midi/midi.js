let audioCtx = new AudioContext();

const NOTE_DETAILS = [
    { note: "C", key: "Z", frequency: 261.626, active: false},
    { note: "Db", key: "S", frequency: 277.183, active: false },
    { note: "D", key: "X", frequency: 293.665, active: false },
    { note: "Eb", key: "D", frequency: 311.127, active: false },
    { note: "E", key: "C", frequency: 329.628, active: false },
    { note: "F", key: "V", frequency: 349.228, active: false },
    { note: "Gb", key: "G", frequency: 369.994, active: false },
    { note: "G", key: "B", frequency: 391.995, active: false },
    { note: "Ab", key: "H", frequency: 415.305, active: false },
    { note: "A", key: "N", frequency: 440, active: false },
    { note: "Bb", key: "J", frequency: 466.164, active: false },
    { note: "B", key: "M", frequency: 493.883, active: false }
  ]

init()

function init() {
    // Intialize event listeners
    document.addEventListener('keydown', (e) => {
        // Prevent key from repeating
        if (e.repeat) return
        let matchedNotes = getNote(e.key)

        if(matchedNotes === undefined) return
        // Identify the notes with keydown event listeners
        matchedNotes.active = true;     
        playNote(matchedNotes)
    })

    document.addEventListener('keyup', (e) => {
        let matchedNotes = getNote(e.key)

        if(matchedNotes === undefined) return

        matchedNotes.active = false;
        playNote(matchedNotes)
    })
}

function getNote(key) {
    return NOTE_DETAILS.find((note) => note.key === key.toUpperCase())
}

function startNote(note, gain) {
    let oscillator = audioCtx.createOscillator();
    let gain_node = audioCtx.createGain()

    console.log(gain)
    gain_node.gain.value = gain
    oscillator.type = "sine";
    oscillator.frequency.value = note.frequency;
    oscillator.connect(gain_node).connect(audioCtx.destination);
    oscillator.start();

    note.oscillator = oscillator;
}


function playNote(note_obj) {
    let target_element = document.querySelector(`[data-note=${note_obj.note}]`);
    target_element.classList.toggle('active', note_obj.active)

    if (note_obj.oscillator != null) {
        note_obj.oscillator.stop();
        note_obj.oscillator.disconnect();
    }

    if (note_obj.active) {
        let active_notes = NOTE_DETAILS.filter((note) => note.active)
        let gain = .5 / active_notes.length;
        startNote(note_obj, gain)
    }
}

// Kyle's way
// function playNote() {
//     NOTE_DETAILS.forEach((note_obj) => {
//         let target_element = document.querySelector(`[data-note=${note_obj.note}]`);
//         target_element.classList.toggle('active', note_obj.active)

//         if (note_obj.oscillator != null) {
//             note_obj.oscillator.stop();
//             note_obj.oscillator.disconnect();

//             console.log(note_obj.oscillator.context)
//         }
//     })

//     let active_notes = NOTE_DETAILS.filter((note) => note.active)
//     let gain = 1 / active_notes.length

//     active_notes.forEach((note) => {
//         startNote(note, gain)
//     })
// }

// My initial way
// function playNote(note_obj) {
//     let target_element = document.querySelector(`[data-note=${note_obj.note}]`);
//     target_element.classList.toggle('active', note_obj.active)
   
//     let active_notes = NOTE_DETAILS.filter((note) => note.active)
//     let gain = 1 / active_notes.length

//     if (note_obj.oscillator != null) {
//         note_obj.oscillator.stop();
//         note_obj.oscillator.disconnect();
//     }

//     active_notes.forEach((note) => {
//         startNote(note, gain)
//     })
// }