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
        this.from.tmpSumError += this.to.errorOffset * (this.weight / this.to.sumOfWeightsForIncomingConnections())
        //this.from.tmpSumError += this.to.errorOffset * this.weight
    }

    applyDeltaWeights() {
        let x = this.from.value
        let lr = NeuralNetwork.learningRate
        let error = this.to.errorOffset
        let output = this.to.value
        let deltaWeight = lr * error * NeuralNetwork.derivActivationFn(output, true) * x
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
