/* iterate through json, fill in data and append to html */
var qFill = function(template, value, placeholder) {
    return template.replace(placeholder || '%data%', value);
};


var bio = {
    name: 'Yu Guo',
    role: 'Data Scientist',
    contacts: {
        mobile: '425-555-5555',
        email: 'yuguo01462@gmail.com',
        github: 'prodbuilder',
        twitter: '@NA',
        location: 'San Francisco, CA',
    },
    welcomeMessage: 'Deep expertise in data, passionate about product and web development',
    skills: ['Statistical modeling', 'Machine learning', 'Experimental Design', 'Data Analysis', 'Web Development'],
    biopic: 'https://avatars2.githubusercontent.com/u/6679199?v=3&s=460',
    display: function() {
        var header = $('#header');
        var name = qFill(HTMLheaderName, this.name);
        var role = qFill(HTMLheaderRole, this.role);
        header.prepend(role).prepend(name);

        var biopic = qFill(HTMLbioPic, this.biopic);
        $('.biopic').addClass('img-circle');
        var welcomeMsg = qFill(HTMLwelcomeMsg, this.welcomeMessage);
        header.append(biopic).append(welcomeMsg);

        for (c in this.contacts) {
            cList = qFill(qFill(HTMLcontactGeneric, c, '%contact%'), this.contacts[c])
            $('#topContacts').append(cList);
            $('#lets-connect ul').append(cList);
            $(".navbar-right .dropdown-menu #" + c + " a").append(this.contacts[c]);
        }

        header.append(HTMLskillsStart);
        for (s in this.skills) {
            $('#skills').append(qFill(HTMLskills, this.skills[s]));
        }
    },
};

var education = {
    schools: [{
        name: 'Harvard University',
        location: 'Cambridge, MA',
        degree: 'PhD',
        majors: ['Biostatistics'],
        dates: 2006,
        url: 'http://harvard.edu'
    }, {
        name: 'Nankai University',
        location: 'Tianjin, China',
        degree: 'BS',
        majors: ['Mathematics'],
        dates: 2000,
        url: 'http://www.nankai.edu.cn'
    }],
    onlineCourses: [{
        title: 'JavaScript Crash Course',
        school: 'Udacity',
        date: 2016,
        url: 'http://udacity.com',
    }, {
        title: 'Full Stack Web Developer Nanodegree',
        school: 'Udacity',
        date: 2015,
        url: 'http://udacity.com',
    }],
    display: function() {
        var edu = $('#education');
        edu.append(HTMLschoolStart);
        for (s in this.schools) {
            var sch = this.schools[s];
            var name = qFill(HTMLschoolName, sch.name).replace('#', sch.url);
            var degree = qFill(HTMLschoolDegree, sch.degree);
            var dates = qFill(HTMLschoolDates, sch.dates);
            var location = qFill(HTMLschoolLocation, sch.location);
            var major = qFill(HTMLschoolMajor, sch.majors);
            $('.education-entry')
                .append(name + degree)
                .append(dates)
                .append(location)
                .append(major);
        }

        var HTMLonlineStart = '<div class="online-class"></div>';
        edu.append(HTMLonlineStart);
        var onlineClass = $('.online-class');
        onlineClass.append(HTMLonlineClasses);

        for (c in this.onlineCourses) {
            var course = this.onlineCourses[c];
            var title = qFill(HTMLonlineTitle, course.title).replace('#', course.url);
            var school = qFill(HTMLonlineSchool, course.school);
            var dates = qFill(HTMLonlineDates, course.date);
            onlineClass
                .append(title + school)
                .append(dates + '<br>');
        }
    },
};

var work = {
    jobs: [{
        employer: 'Thumbtack',
        title: 'Data Scientist',
        location: 'San Francisco, CA',
        dates: 'Feb 2015-Now',
        description: 'Data Science',
        url: 'http://Thumbtack.com',
    }, {
        employer: 'Microsoft',
        title: 'Sr. Applied Researcher',
        location: 'Seattle, WA',
        dates: 'April 2013-Jan 2015',
        description: 'Analysis and Experimentation',
        url: 'http://Microsoft.com',
    }, {
        employer: 'BG Medicine',
        title: 'Sr. Biostatistician, Manager',
        location: 'Waltham, MA',
        dates: 'Oct 2005-March 2013',
        description: 'Biostatistics',
        url: 'http://bg-medicine.com',
    }, {
        employer: 'UMass Amherst',
        title: 'Instructor',
        location: 'Amherst, MA',
        dates: 'Sept 2010-May 2011',
        description: 'Introductory and Intermediate Biostatistics',
        url: 'http://www.umass.edu/sphhs/biostatistics',
    }],
    display: function() {
        $('#workExperience').append(HTMLworkStart);
        for (j in this.jobs) {
            var job = this.jobs[j];
            var employer = qFill(HTMLworkEmployer, job.employer).replace('#', job.url);
            var title = qFill(HTMLworkTitle, job.title);
            var location = qFill(HTMLworkLocation, job.location);
            var dates = qFill(HTMLworkDates, job.dates);
            var description = qFill(HTMLworkDescription, job.description);
            $('.work-entry')
                .append(employer + title)
                .append(dates)
                .append(location)
                .append(description);
        }
    }
};

var projects = {
    projects: [{
        title: 'Item Catalog',
        dates: '2015-12',
        description: 'Basic Flask web app with JSON and XML APIs, CRUD and OAuth with Google+ and Facebook login',
        images: ['http://lorempixel.com/300/180/abstract/', 'http://lorempixel.com/g/300/180/abstract/'],
    }],
    display: function() {
        $('#projects').append(HTMLprojectStart);
        for (p in this.projects) {
            var proj = this.projects[p];
            var title = qFill(HTMLprojectTitle, proj.title);
            var dates = qFill(HTMLprojectDates, proj.dates);
            var description = qFill(HTMLprojectDescription, proj.description);
            $('.project-entry')
                .append(title)
                .append(dates)
                .append(description)
                .append('<div class="imgs flex-box"></div>');

            for (i in proj.images) {
                $('.project-entry:last').append('<div>' + qFill(HTMLprojectImage, proj.images[i]) + '</div>');
            }
            $('.project-entry img').addClass('img-responsive');
        }
    }
};

var map = {
    display: function() {
        $('#mapDiv').append(googleMap);
    }
}



bio.display();
education.display();
work.display();
projects.display();
map.display();
