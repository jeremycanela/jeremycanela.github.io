// Logo animation
$(".logo").css("height", $(".logo div").height());

$(".logo div").css({
	"position": "absolute",
	"top" : "40px",
	"left": "0",
    "right": "0"
}).animate({
    top: 0
}, 1000);

// Tilt.js
$(".project .view").tilt({
    scale: 1.08,
    glare: true,
    maxGlare: .5
});

// Projects
$(".project .view").on("mouseover", (event) => {
	$(".project .view").parent(".project").css("z-index", "0");
	$(event.target).parent(".project").css("z-index", "1");
});