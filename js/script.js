/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
// Instructions for this project:  https://teamtreehouse.com/projects/list-pagination-and-filtering

/* YM 6/17/2019:
    Three Global constant variables
    1) studentList:
        - Get the studemt-list from the html page (DOM element).
        - With this querySelector I am looking for any tag with the class name of student-list
          (querySelector checks for class names when input parameter begins with a period).
          Then I select the student-list element's children (every student list item in the unordered list).
    2) pageItemCount:
        - This constant will be referenced throughout the js file.
        - I set the number of items to appear in a given page.
        - 10 items will appear on each page.
    3) arraySearchResults
        - any time the search is conducted it stores its results.
        - Array is passed to appendPageLinks() to create pagination links for the search results.
*/
const studentList = document.querySelector('.student-list').children;
const pageItemCount = 10;
var arraySearchResults = Array();

/* YM 6/17/2019:
    1) Create the showPage function
       - This arrow function will take the list of all students and show a particular page.
       - List and page are the two parameters for the showPage function.

          -- list - the list of students to display on the page
          -- page - which page number to display among the students

        - The lowerLimitOfPage will calculate the lowest index of the item to display on the page
        - The upperLimitOfPage will calculate the largest index of the item to display on the page
                n persons, 10 items per page
                page 1 -> 0,1,2,3,4,5,6,7,8,9 -- display
                  everything else   --hide
                page 2 -> 10,11,12,13,14,15,16,17,18,19  --show
                  everything else --hide
                page 3 -> 20,21,22,23,24,25,26,27,28,29  --show
                  everything else --hide
                and so on...

            Determine formula for upper and lower in each possible page:
                lowerLimitOfPage = (page - 1) * pageIemCount
                  -  we take the total page count and multiply it by page number minus one
                  -  the limit of page one is zero
                  -   f(1) = 0, f(2) = 10, f(3) = 20, ..., f(12) = (12-1)*10 = 110, ...
                upperLimitOfPage = (page * pageItemCount) - 1
                  -  we take the total page count and multiply by page number, offset this by 1
                  -  g(1) = 9, g(2) = 19, g(3) = 29, ..., g(12) = (12*10) - 1 = 120 -1 = 119, ...

          The for loop iterates through each item in list by moving through its indexes.
          ("If you want to run the same code over and over again, each time with a different value.") https://www.w3schools.com/js/js_loop_for.asp
            - let i = 0
                - We declare a variable i set to 0 (the first index of the list).
            - i < list.length
                - The for loop will end when i is equal to the length of the list.
            - i += 1
                - With each iteration add 1 to i (stepping through each index).

          With each iteration:
            - let li = list[i] = declaring this local variable of li we get the item at index i
                we visit each element of list only once.

              Conditional to check if i is between upperLimitOfPage and lowerLimitOfPage. https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
                 - Display:  If it is between, show the item (set display property to empty [empty means let the tag operate under its default display style])
                 - Hide:     If it isn't, hide it (set display property to none)

            The if statement has a boolean logical operator of &&.
              - If both expressions are true then the entire statement is true. If either is false, the entire statement is false.
 */

const showPage = (list, page) => {
    let lowerLimitOfPage = (page-1) * pageItemCount;
    let upperLimitOfPage = (page * pageItemCount) - 1;

    for (let i = 0; i < list.length; i +=1) {
        let li = list[i];
        if (i >= lowerLimitOfPage && i <= upperLimitOfPage) {
            li.style.display = ''; //Display
        } else {
            li.style.display = 'none'; //Hide
        }
    }
}

/* YM 6/17/2019:
    2) Create the appendPageLinks function
      Variables
        var numPages = Math.ceil(list.length/pageItemCount);
            - total page count = items in list / items per page
            - then round the number up to the nearest whole number
        const pageDiv = document.querySelector('.page');
            - the query selector gets the first element found in the DOM with class page
        const paginatorDiv = document.createElement('div');
            - create an element of tag name div
      paginatorDiv.setAttribute('class', 'pagination');
          - set attribute 'class' to pagination
          - attribute is a property or a characteristic of an element
      pageDiv.appendChild(paginatorDiv);
          - we are appending the paginatorDiv element to the pageDiv
      const ul = document.createElement('ul');
          - we will create a ul element
      paginatorDiv.appendChild(ul);
          - we are appending the ul element to the paginatorDiv
      for (let i = 1; i<= numPages; i+= 1)
          - Create a for loop, setting the 1st argument for index 'i' to 1 and conditional to i <= numPages
            -- start at page 1 and add 1 until numPages is reached, then run one more iteration for that last page
          - In each iteration:
            -- create a new li element
            -- create a new a element
            -- set the element a's class to paginationLink (to search for at a later time)
            -- set innertext for the a link to the page number (i)
            -- add the element a to li, then add li to the ul
            -- If this is the first link (i==1), set the class to 'paginationLink active' = add in the 'active' class to the link so it appears like :hover
                This will make it so that when a new search is conducted or the page loads for the first time, the [1] pagination link is highlighted

            -- create an event listener for the a link element, for event 'click':
              --- define the listener to include the event as variable 'e' ["click",(e) => {}]
              --- define const wasClicked, set to e.target, representing the a link that was clicked
              --- get the list of all pagination links (querySelector for the class paginationLink)
              --- for loop through each element in paginationLinkList [j=0; j< .length; j+=1]:
                ----set each link's class to paginationLink [removing any 'active' class that would exist; reset the style]
              --- set the class for the wasClicked a element to 'paginationLink active' = add in the 'active' class to the link so it appears like :hover

*/
   const appendPageLinks = (list) => {
    var numPages = Math.ceil(list.length/pageItemCount);
    const pageDiv = document.querySelector('.page');
    const paginatorDiv = document.createElement('div');

    paginatorDiv.setAttribute('class', 'pagination');
    pageDiv.appendChild(paginatorDiv);

    const ul = document.createElement('ul');

    paginatorDiv.appendChild(ul);

    for (let i = 1; i<= numPages; i+= 1)
    {
    let li = document.createElement('li');
    let paginationLink = document.createElement('a');

    paginationLink.setAttribute('class', 'paginationLink');

    paginationLink.innerText = i;
    li.appendChild(paginationLink);
    ul.appendChild(li);

    if (i == 1)
    {
      paginationLink.setAttribute('class', "paginationLink active");
    }

    paginationLink.addEventListener("click",(e) => {
      showPage(list,i);

      const wasClicked = e.target;
      const paginationLinkList = document.querySelectorAll('.paginationLink');
      for (let j = 0; j < paginationLinkList.length; j+= 1)
      {
         let link = paginationLinkList[j];
         link.setAttribute('class', 'paginationLink');
      }
      wasClicked.setAttribute('class', "paginationLink active");
     });
  }
}

/*
YM 6/20/2019:
  3) define function appendSearch - this will add elements to the page for searching, and define event listeners for the necessary elements
    Get page element having class 'page-header'
    Define page elements necessary:
      - A div studentSearch
      - An input searchBox
      - A button searchButton
    Set properties for these
      - searchButton text 'Search'
      - searchBox gets attribute 'placeholder' = 'Search for students'
      - studentSearch gets attribute 'class' = 'student-search'
    Add the button and input to studentSearch, then add studentSearch to pageHeader
    Define a listener for button for event "click" to run function runSearch, passing in searchBox property 'value'
    Define a listener for input for event "keyup"to run function runSearch, passing in searchBox property 'value'
*/

const appendSearch = () => {
  let pageHeader = document.querySelector('.page-header');
  let studentSearch = document.createElement('div');
  let searchBox = document.createElement('input');
  let searchButton = document.createElement('button');

  searchButton.textContent = 'Search';
  searchBox.setAttribute('placeholder', 'Search for students...');
  studentSearch.setAttribute('class', 'student-search');

  studentSearch.appendChild(searchBox);
  studentSearch.appendChild(searchButton);
  pageHeader.appendChild(studentSearch);

  searchButton.addEventListener("click",() => {
  runSearch (searchBox.value);
  });

  searchBox.addEventListener("keyup",() => {
    runSearch (searchBox.value);
    });
}

/*
YM 6/20/2019:
  4) define function runSearch - execute a search among studentList using input parameter 'inputValue'
      Set global arraySearchResults to the empty array
      Define a local variable itemsShown, which will keep count of how many items were displayed due to search
      Create a for loop to look through each item in studentList
        - assign li to studentList[i]
        - within li, select the tag with class 'student-details' set to variable div
        - within that div, get the single element with tag name 'h3' [getElementsByTagName()] - this is where the student's name is stored
        - Use String.includes() to seek 'inputValue' in that tag's innerText
          - If a match, add the 'li' to the arraySearchResults (Array.push()) and increment itemsShown
            -- If a single page worth of items has not already been displayed [itemsShown < pageItemCount] display the item
            =- If a single page has been displayed (ItemsShown >= pageItemCount) hide the item
          - If not a match, hide the item
        Cleanup from prior actions: need to remove any paginator link section or "No results" notice
          - Create variable existingPagination to select any existing pagination section in the DOM
          - If one exists, remove it from the page
        - Create variable existingEmptyNotice to select any existing notice that no results were returned
          - If one exists, remove it from the page
        Conditional: if no search results (itemsShown == 0) construct a no results notice and append it to the element to class page as a child
        If any search results and more than pageItemCount, execute appendPageLinks(arraySearchResults);
*/

const runSearch = (inputValue) => {
  arraySearchResults = Array();
  let itemsShown = 0;

  for (let i = 0; i < studentList.length; i +=1) {
    let li = studentList[i];
    let div = li.querySelector('.student-details');
    let nameTag = div.getElementsByTagName('h3')[0];
    let name = nameTag.innerText;

    if (name.includes(inputValue)) {
      arraySearchResults.push(li);
      itemsShown += 1;
       if (itemsShown <= pageItemCount)
       {
        li.style.display = ''; //display
       }
      else
        {
          li.style.display = 'none'; //hide
        }
    } else {
        li.style.display = 'none'; //hide
    }
  }

  const existingPagination = document.querySelector(".pagination");
  const existingEmptyNotice = document.querySelector(".empty-search");
  if (existingPagination != null)
    existingPagination.remove();
  if (existingEmptyNotice != null)
    existingEmptyNotice.remove();

  if (itemsShown == 0)
{
  let pageDiv = document.querySelector('.page');
  let noResults = document.createElement('div');
  noResults.style.fontSize = "24px";
  noResults.setAttribute('class', 'empty-search');
  noResults.innerText = 'No results';
  pageDiv.appendChild(noResults);

}
else if (itemsShown > pageItemCount)
{
  appendPageLinks(arraySearchResults);
}
}

//When the HTML first loads:
//show the first page
showPage(studentList, 1);
//build pagination links for the entire studentList
appendPageLinks(studentList);
//add in the search components
appendSearch();



