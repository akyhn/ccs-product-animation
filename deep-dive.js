gsap.registerPlugin(ScrollTrigger)

let mainWrapper = document.querySelector("[fs-deep-dive='main-wrapper']")
let trigger = document.querySelector("[fs-deep-dive='trigger']")
let component = document.querySelector("[fs-deep-dive='component']")
let container = document.querySelector("[fs-deep-dive='scroll-container']")
let scrollWrapper = document.querySelector("[fs-deep-dive='scroll-wrapper']")
let target = document.querySelector("[fs-deep-dive='target']")
let children = container.children

let totalWidth = 0

gsap.set(target, {xPercent: 100})
const targetColor = target.style.backgroundColor
const body = $("body")

const deepDiveTransition = 0.8
let root = document.querySelector(":root")
root.style.setProperty(
  "--deep-dive-transition-duration",
  deepDiveTransition + "s"
)

for (let i = 0; i < children.length; i++) {
  totalWidth += children[i].clientWidth
}

$(scrollWrapper).css("height", totalWidth + "px")
$(component).css("height", totalWidth + "px")

function o() {
  let tl = gsap.timeline({ease: "power1.inOut"})

  tl.to(body, {backgroundColor: targetColor, duration: 0})
  tl.to(mainWrapper, {opacity: 0, duration: 0.25}, "<")
  tl.to(component, {left: "0", xPercent: 0, duration: deepDiveTransition}, "<")
  tl.to(target, {right: "0", xPercent: 0, duration: 1, ease: "power1.out"}, "<")
  tl.to(mainWrapper, {display: "none"})

  gsap.to(container, {
    x: -totalWidth + container.offsetWidth,
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: scrollWrapper,
      scrub: 0.1,
      markers: true,
      start: "top top",
      end: "bottom center"
    }
  })
}
console.log("Component height is: " + component.clientHeight)

$(trigger).on("click", function () {
  $(mainWrapper).toggleClass("deep-dive")
  o()
})
console.log(-totalWidth + container.offsetWidth)
