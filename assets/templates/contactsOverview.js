function overviewTemplate(contacts, i, firstLetter, secondLetter) {
    return `
            <div id="${i}" class="singleEntry" onclick="removeClosed(), showDetailsResponsive(), contactDetailCard(id), addBackground(id)">
                <div class="userInitialsOverview" style="background-color: ${contacts[i].userColor};">${firstLetter}${secondLetter}</div>    
                <div>
                    <div id="entryInfoName">${contacts[i].name}</div>
                    <div id="entryInfoMail">${contacts[i].email}</div>
                </div>
            </div>`;
}

function contactCardDetailsTemplate(id, contact) {
    let initials = contact.name.charAt(0) + (contact.name.split(" ")[1]?.charAt(0) || "");
    return `
            <div id="contactCardHeader">
                <div class="userInitials circle" style="background-color: ${contact.userColor}">${initials}</div>
                <div id="userInfo">
                    <div id="userName">${contact.name}</div>
                    <div class="action">
                            <div id="edit" onclick="openEditDialog(currentUser, ${id})">
                                <img src="assets/img/edit_icon.svg" alt="edit icon">
                                <span>Edit</span>
                            </div>
                            <div id="delete" onclick="deleteContact(${contact.id})">
                                <img src="assets/img/delete_icon.svg" alt="delete icon">
                                <span>Delete</span>
                            </div>
                    </div>
                </div>
            </div>
            <div id="contactCardUserInfo">
                <div id="contactText">
                    <span>Contact Information</span>
                </div>
                <div id="contactCardEmail">
                    <p>Email</p>
                    <div id="contactEmailAdr">
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                </div>
                <div id="contactCardPhone">
                    <p>Phone</p>
                    <div id="contactPhoneNr">${contact.phone || "no phone number available"}</div>
                </div>
                <div id="buttonMenuContainer">
                    <button class="btn_menuResponsive" onclick="openMenuDialog()"><img src="assets/img/more_vert.svg" alt="open menu"></button>
                    <div id="moreResponsive" class="closed">
                        <div id="edit" onclick="openEditDialog(currentUser, ${id})">
                            <img src="assets/img/edit_icon.svg" alt="edit icon">
                            <span>Edit</span>
                        </div>
                        <div id="delete" onclick="deleteContact(${contact.id})">
                            <img src="assets/img/delete_icon.svg" alt="delete icon">
                            <span>Delete</span>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

function newContactTemplate() {
    return `
      <div id="newContactContent">
        <div id="addContactHeaderContainer">
            <div id="responsiveClose" onclick="closeDialog('[newContactDialog]')">
                <img id="closingImg" src="assets/img/close.svg" alt="close Dialog">
            </div>
            <div id="addContactHeader">
                <div id="joinLogo">
                    <img src="assets/img/join_logo_menu.png" alt="Join Logo">
                </div>
                <div id="newContactHeaderText">
                    <p>Add contact</p>
                    <span>Tasks are better with a team!</span>
                </div>
                <div id="newContactDivider"></div>
            </div>  
        </div>
        <div id="circleContainer">
          <div id="circle"><img src="./assets/img/person.svg" alt="user icon"></div>
        </div>
        <div id="newContactFormContainer">
            <div id="formContainer">
                <div id="addUserFormContainer">
                    <div id="cancelImgContainer">
                        <svg id="closingImg" alt="Cancel" onclick="closeDialog('[newContactDialog]');" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71720_5527" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                                <rect x="4" y="4" width="24" height="24" fill="#000000"/>
                            </mask>
                            <g mask="url(#mask0_71720_5527)">
                                <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                    </div>
                    <form id="newUserForm" novalidate>
                        <div class="inputField">
                            <input type="text" id="newUserName" name="name" placeholder="Name" required>
                            <img src="./assets/img/user_icon.png" alt="user icon">
                            <div class="error-message" id="nameError"></div>
                        </div>
                        <div class="inputField">
                            <input type="email" id="newUserEmail" name="email" placeholder="Email" required>
                            <img src="./assets/img/mail_icon.png" alt="mail icon">
                            <div class="error-message" id="emailError"></div>
                        </div>
                        <div class="inputField">
                            <input type="number" id="newUserPhone" name="phone" placeholder="Phone" required>
                            <img src="./assets/img/phone_icon.png" alt="phone icon">
                            <div class="error-message" id="phoneError"></div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="btnContainer">
              <button id="btnCancel" class="clear-task-btn" type="button" onclick="closeDialog('[newContactDialog]');">Cancel<img src="./assets/img/cancel_icon.svg" alt="cancel icon"></button>
              <button id="btnCreate" class="create-task-btn" type="submit" form="newUserForm">Create Contact<img src="./assets/img/check_icon.png" alt="create icon"></button>
            </div>
        </div>
        
      </div>
  `;
}

function editContactTemplate(user) {
    let initials = user.name.charAt(0) + (user.name.split(" ")[1]?.charAt(0) || "");
    let userId = user.id;
    return `
            <div id="newContactContent">
              <div id="addContactHeaderContainer">
              <div id="responsiveClose" onclick="closeDialog('[editContactDialog]')">
                <img id="closingImg" src="assets/img/close.svg" alt="close Dialog">
              </div>
              <div id="addContactHeader">
                  <div id="joinLogo">
                      <img src="assets/img/join_logo_menu.png" alt="Join Logo">
                  </div>
                  <div id="newContactHeaderText">
                      <p>Edit contact</p>
                  </div>
                  <div id="newContactDivider"></div>
              </div>  
          </div>
          <div id="circleContainer">
          <div class="userInitials circle no-margin" style="background-color: ${user.userColor}">${initials}</div>
          </div>
          <div id="newContactFormContainer">
              <div id="formContainer">
                  <div id="addUserFormContainer">
                      <div id="cancelImgContainer">
                        <svg id="closingImg" alt="Cancel" onclick="closeDialog('[editContactDialog]');" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_71720_5527" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
                                <rect x="4" y="4" width="24" height="24" fill="#000000"/>
                            </mask>
                            <g mask="url(#mask0_71720_5527)">
                                <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88332 22.4834 9.69999 22.3C9.51665 22.1167 9.42499 21.8834 9.42499 21.6C9.42499 21.3167 9.51665 21.0834 9.69999 20.9L14.6 16L9.69999 11.1C9.51665 10.9167 9.42499 10.6834 9.42499 10.4C9.42499 10.1167 9.51665 9.88338 9.69999 9.70005C9.88332 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
                            </g>
                        </svg>
                      </div>
                      <form id="newUserForm">
                          <div class="inputField">
                            <input type="text" id="editUserName" name="name" placeholder="Name" value="${user.name || ''}" required>
                              <img src="./assets/img/user_icon.png" alt="user icon">
                              <div class="error-message" id="nameError"></div>
                          </div>
                          <div class="inputField">
                              <input type="email" id="editUserEmail" name="email" placeholder="Email" value="${user.email || ''}" required>
                              <img src="./assets/img/mail_icon.png" alt="mail icon">
                              <div class="error-message" id="emailError"></div>
                          </div>
                          <div class="inputField">
                              <input type="number" id="editUserPhone" name="phone" placeholder="Phone" value="${user.phone || ''}" required>
                              <img src="./assets/img/phone_icon.png" alt="phone icon">
                              <div class="error-message" id="phoneError"></div>
                          </div>
                      </form>
                  </div>
              </div>
              <div id="btnContainer">
                <button id="btnCancel" class="clear-task-btn" type="button" onclick="deleteContact(${userId}), closeDialog('[editContactDialog]');">Delete</button>
                <button id="btnCreate" class="create-task-btn" onclick="editContact(${userId})">Save<img src="./assets/img/check_icon.png" alt="check icon"></button>
              </div>
          </div>
        
      </div>
    `;
}