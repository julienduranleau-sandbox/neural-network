class NeuronLayer {
    constructor(name, nNeurons) {
        this.name = name
        this.nNeurons = nNeurons
        this.neurons = []
        this.previousLayer = null
        this.nextLayer = null

        for (let i = 0; i < nNeurons; i++) {
            let neuron = new Neuron(this.name+"_neuron"+i)
            this.neurons.push(neuron)
        }
    }

    getValues() {
        let lst = []
        this.neurons.forEach(neuron => lst.push(neuron.value))
        return lst
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
            //console.log("backPropagate for "+this.name)
            this.neurons.forEach(neuron => neuron.backPropagate())
            this.previousLayer.computeErrorValues()
            this.previousLayer.applyDeltaWeights()
/*
            this.neurons.forEach(neuron => {
                console.log(neuron.errorOffset)
            })
*/
            this.previousLayer.backPropagate()
        }
    }

    applyDeltaWeights() {
        this.neurons.forEach(neuron => neuron.applyDeltaWeights())
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

        this.neurons.forEach(neuron => {
            neuron.draw(drawOffsets)
            drawOffsets.y += 100
        })

        drawOffsets.x = drawOffsetsCopy.x
        drawOffsets.y = drawOffsetsCopy.y
    }
}
