function reload() {
	$("body").animate({opacity: 1}, 1000);
}

function wavingEmoji() {
	$(".waving").animate({ marginLeft: "40px",deg:90},{
		duration: 350,
		step: function(deg) {
			$(this).css({transform: "rotate("+deg+"deg)"});
		},
		complete: function() {
			$(this).animate({marginLeft: "0", deg:0}, {
				duration: 350,
				step: function(deg) {
					$(this).css({transform: "rotate("+deg+"deg)"});
				}
			});
		}
	}, 5000);
}

$(window).bind("load", function() {
	setInterval(wavingEmoji, 5000);

	$('.techdegree-view').tilt({
		glare: true,
		maxGlare: .75
	});

	fetch('/projects.json')
	.then(function(res) {
		return res.json();
	})
	.then(function(projects) {
		projects.projects.forEach((project, index) => {
			index < 10 ? index = `0${index + 1}` : index = index;
			const technologies = project.technologies.join(" &middot; ");
			$("#projects").prepend(`<div class="project clearfix">
				<div class="project-view-outter">
					<div class="project-view-container">
						
							<img src="${project.view}" alt="${project.title}">
						
					</div>
				</div>
				<div class="project-details-outter">
					<div class="project-details">
						<h2 class="project-number">#${index}</h2>
						<h5 class="project-technologies">${technologies}</h5>
						<h2 class="project-title">${project.title}</h2>
						<p class="project-description">${project.description}</p>
						<a href=${project.url} target="_black">
							<div class="default-button-sm"><span>visit project <i class="far fa-arrow-alt-circle-right"></i></span></div>
						</a>
					</div>
				</div>
			</div>`);
			
			reload();
		});
	});

});