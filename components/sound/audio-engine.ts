"use client"

class SoundDesigner {
  private ctx: AudioContext | null = null
  public isMuted: boolean = true // Muted by default for accessibility

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.initContext()
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  // 1. Subtle mechanical tick on element hover
  public playHoverTick() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.015)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.015)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.016)
    } catch {
      // Ignore audio failure
    }
  }

  // 2. Crisp tactile click snap
  public playClickSnap() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(480, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.035)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Ignore audio failure
    }
  }

  // 3. Melodic harmonic triad chord for success actions / terminal commands
  public playSuccessTone() {
    if (this.isMuted) return
    this.initContext()
    if (!this.ctx) return

    try {
      const notes = [523.25, 659.25, 783.99] // C5 - E5 - G5
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.035)

        gain.gain.setValueAtTime(0.025, this.ctx!.currentTime + idx * 0.035)
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.035 + 0.22)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(this.ctx!.currentTime + idx * 0.035)
        osc.stop(this.ctx!.currentTime + idx * 0.035 + 0.23)
      })
    } catch {
      // Ignore audio failure
    }
  }
}

export const soundFx = typeof window !== "undefined" ? new SoundDesigner() : ({} as SoundDesigner)
