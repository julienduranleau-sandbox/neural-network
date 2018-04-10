class NeuronLayer {
    constructor(name, nNeurons) {
        this.name = name
        this.nNeurons = nNeurons
        this.neurons = []
        this.previousLayer = null
        this.nextLayer = null

        for (let i = 0; i < nNeurons; i++) {
            let neuron = null

            if (this.isInputs) {
                neuron = new Neuron(this.name+"_neuron"+i, 0)
            } else {
                neuron = new Neuron(this.name+"_neuron"+i)
            }

            this.neurons.push(neuron)
        }
    }

    get isInputs() { return this.name === "Inputs" }
    get isOutputs() { return this.name === "Outputs" }
    get isHiddens() { return !(this.isInputs || this.isOutputs) }

    getValues(raw) {
        return this.neurons.reduce((lst, neuron) => {
            if (raw) {
                lst.push(neuron.value)
            } else {
                lst.push(Math.round(neuron.value * 1000) / 1000)
            }
            return lst
        }, [])
    }

    setValues(values) {
        if (values.length != this.nNeurons) {
            throw "Unable to set ("+values.length+") values to a layer with ("+this.nNeurons+") neurons"
        }

        this.neurons.forEach((neuron, i) => neuron.value = values[i])
    }

    feedForward() {
        if (this.nextLayer) {
            this.neurons.forEach(neuron => neuron.feedForward())
            this.nextLayer.computeFeedValues()
            this.nextLayer.feedForward()
        }
    }

    computeFeedValues() {
        this.neurons.forEach(neuron => neuron.computeFeedValues())
    }

    setErrorsFromLabels(labels) {
        if (labels.length != this.nNeurons) {
            throw "Unable to set ("+labels.length+") labels to a layer with ("+this.nNeurons+") neurons"
        }

        this.neurons.forEach((neuron, i) => neuron.setErrorFromLabel(labels[i]))
    }

    backPropagate() {
        if (this.previousLayer) {
            this.neurons.forEach(neuron => neuron.backPropagate())
            this.previousLayer.computeErrorValues()
            this.previousLayer.applyDeltaWeights()
            this.previousLayer.backPropagate()
            if (this.previousLayer.isInputs === false) {
                this.previousLayer.applyDeltaBias()
            }
        }
    }

    applyDeltaWeights() {
        this.neurons.forEach(neuron => neuron.applyDeltaWeights())
    }

    applyDeltaBias() {
        this.neurons.forEach(neuron => neuron.applyDeltaBias())
    }

    computeErrorValues() {
        this.neurons.forEach(neuron => neuron.computeErrorValues())
    }

    connect(otherLayer) {
        this.nextLayer = otherLayer
        otherLayer.previousLayer = this

        this.neurons.forEach((neuron) => {
            otherLayer.neurons.forEach(otherNeuron => {
                neuron.connect(otherNeuron)
            })
        })
    }

    draw(drawOffsets) {
        let drawOffsetsCopy = { x : drawOffsets.x, y: drawOffsets.y }

        let spacing = 700 / this.neurons.length
        drawOffsets.y += (700 - ((this.neurons.length - 1) * spacing)) / 2

        this.neurons.forEach(neuron => {
            neuron.draw(drawOffsets)
            drawOffsets.y += spacing
        })

        drawOffsets.x = drawOffsetsCopy.x
        drawOffsets.y = drawOffsetsCopy.y
    }

    drawConnections(drawOffsets) {
        let drawOffsetsCopy = { x : drawOffsets.x, y: drawOffsets.y }

        let spacing = 700 / this.neurons.length
        drawOffsets.y += (700 - ((this.neurons.length - 1) * spacing)) / 2

        this.neurons.forEach(neuron => {
            neuron.drawConnections(drawOffsets)
            drawOffsets.y += spacing
        })

        drawOffsets.x = drawOffsetsCopy.x
        drawOffsets.y = drawOffsetsCopy.y
    }
}
