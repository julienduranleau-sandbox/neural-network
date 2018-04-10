class NeuronConnection {
    constructor(from, to) {
        this.from = from
        this.to = to
        this.weight = Math.random()
    }

    feedForward() {
        this.to.tmpSumValue += this.from.value * this.weight
    }

    backPropagate() {
        //this.from.tmpSumError += this.to.errorOffset * (this.weight / this.from.sumOfWeightsForOutgoingConnections())
        this.from.tmpSumError += this.to.errorOffset * this.weight
    }

    applyDeltaWeights() {
        let deltaWeight = NeuralNetwork.learningRate * this.to.errorOffset * NeuralNetwork.dsigmoid(this.to.value, true) * this.from.value
        this.weight += deltaWeight
    }

    draw() {
        textSize(11)
        noStroke()
        fill(255)
        let a = Math.atan2(this.to.lastDrawOffset.y - this.from.lastDrawOffset.y, this.to.lastDrawOffset.x - this.from.lastDrawOffset.x)
        let pos = {
            x: this.from.lastDrawOffset.x + Math.cos(a) * 45,
            y: this.from.lastDrawOffset.y + Math.sin(a) * 45
        }
        text(this.weight.toFixed(2), pos.x, pos.y)
    }

    drawConnections() {
        stroke(100)
        strokeWeight(1)
        line(this.from.lastDrawOffset.x, this.from.lastDrawOffset.y, this.to.lastDrawOffset.x, this.to.lastDrawOffset.y)
    }
}
