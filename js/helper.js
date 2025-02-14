
    /**
     * Returns the average energy (amplitude) for frequencies in the range [lowFreq, highFreq].
     * @param {THREE.AudioAnalyser} analyser - The THREE.AudioAnalyser instance.
     * @param {number} lowFreq - The lower bound of the frequency range (in Hz).
     * @param {number} highFreq - The upper bound of the frequency range (in Hz).
     * @returns {number} - The average energy in the specified frequency range.
     */
    function getEnergyForRange(analyser, lowFreq, highFreq) {
        // Get the current frequency data as a Uint8Array.
        const frequencyData = analyser.getFrequencyData();

        // Get the sample rate from the underlying audio context.
        // THREE.AudioAnalyser wraps an AnalyserNode in its "analyser" property.
        const sampleRate = analyser.analyser.context.sampleRate;

        // The frequencyBinCount is the number of frequency data values.
        const binCount = frequencyData.length;

        // The frequency resolution (Hz per bin) is half the sample rate divided by the number of bins.
        const freqResolution = (sampleRate / 2) / binCount;

        // Calculate the bin indices corresponding to the low and high frequencies.
        const startBin = Math.floor(lowFreq / freqResolution);
        const endBin = Math.floor(highFreq / freqResolution);

        // Sum the amplitudes for the bins within the specified frequency range.
        let sum = 0;
        let count = 0;
        for (let i = startBin; i <= endBin; i++) {
            sum += frequencyData[i];
            count++;
        }

        // Return the average energy (or 0 if no bins found).
        return count > 0 ? sum / count : 0;
    }

    // randomizes order of an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function getRMS(data) {
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) {
            sumSquares += data[i] * data[i];
        }
        return Math.sqrt(sumSquares / data.length);
    }
    
    // clamp helper (keep a value within range)
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    // scroll text loader
    async function loadScrollText(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return await response.text();
    }

    function logMaxTextureSize() {
        const gl = renderer.getContext();
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        console.log("Max texture size = " + maxTextureSize);
    }

    function logTopSourceCodeLines() { // ehh...
        // Fetch the current document's source code using its URL.
        fetch(window.location.href)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.text();
        })
        .then(source => {
            // Split the source code into lines.
            const lines = source.split('\n');
            // Log the first 45 lines (or all if there are fewer than 45).
            for (let i = 0; i < 45 && i < lines.length; i++) {
                console.log(lines[i]);
            }
        })
        .catch(error => console.error("Error fetching source code:", error));
    }