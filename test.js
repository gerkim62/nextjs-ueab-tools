

// step 2:extract profile link 
const profileLink = 'https://ielearning.ueab.ac.ke/user/profile.php?id=10131';

// step 3:extract course links
const courseLinks = await fetchHTMLAndExtractLinks(profileLink)

// step 4: fetch each course link 




//functions
const fetchProfileUrlAndExtractCourseLinks = async (profileUrl) => {
  try {
    const response = await fetch(profileUrl);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const anchorElements = [...doc.querySelectorAll('#usercourses ul li a')];

    const uniqueLinks = [...new Set(anchorElements.map(element => element.href))];

    return uniqueLinks;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const getCourseDetailsFromLink =async (courseLink)=>{
      const response = await fetch(courseLink);
    const html = await response.text();
    
    //logic for extracting course details here
}

