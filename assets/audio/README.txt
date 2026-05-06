VOICE FILE NAMING CONVENTION
============================

Path:    assets/audio/{character}/{emotion}_{index}.mp3

Examples
--------
assets/audio/himari/happy_01.mp3
assets/audio/himari/happy_02.mp3
assets/audio/himari/obsessive_01.mp3
assets/audio/shizuku/sad_01.mp3
assets/audio/reina/cold_01.mp3
assets/audio/mei/playful_01.mp3

Rules
-----
- character : himari | shizuku | reina | mei  (must match CHARACTERS key)
- emotion   : any lowercase tag (no spaces, use underscores: "suppressed_anger")
- index     : two-digit zero-padded number starting at 01 (01, 02 ... 20)
- format    : MP3, 44.1 kHz, mono or stereo, any bitrate

Adding new files
----------------
Just drop the file in the correct folder.  No code changes needed.
The engine probes for files 01–20 on first use of each emotion.
Files beyond 20 will not be found; raise PROBE_LIMIT in voice-system.js if needed.

Supported emotion tags (examples — add anything)
-------------------------------------------------
happy       sad         angry       annoyed     cold
teasing     whisper     obsessive   possessive  playful
broken      scorn       sigh        laugh       shock
tender      nervous     excited     hollow      desperate
satisfied   confused    jealous     pleading    threatening

Character tone guidelines
-------------------------
himari   — possessive, intense, dramatic, explosive
shizuku  — fragile, quiet, trembling, occasionally hysterical
reina    — clinical, controlled, dry, unsettling precision
mei      — childlike, cheerful, randomly unhinged, sing-song
