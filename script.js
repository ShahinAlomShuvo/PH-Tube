const getCategory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );

    if (!res.ok) {
      throw "404 Data Was Not Found";
    }

    const data = await res.json();

    const categories = data.data;

    const tabContainer = document.getElementById("tabContainer");

    categories.forEach((category) => {
      const tab = document.createElement("div");
      tab.classList = `tabs tabs-boxed bg-white gap-4`;
      tab.innerHTML = `
      <a onclick="getTubeData('${category.category_id}')" class="tab btn btn-sm">${category.category}</a>
    `;
      tabContainer.appendChild(tab);
    });
  } catch (err) {
    console.log("ERROR:", err);
  }
};

const getTubeData = async (categoryId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );

    if (!res.ok) {
      throw "404 Data Was Not Found";
    }
    const data = await res.json();
    const tubeData = data.data;

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.textContent = "";

    if (tubeData.length === 0) {
      const cardContainer = document.getElementById("cardContainer");
      cardContainer.innerHTML = `
          <div class="flex flex-col justify-center items-center h-full text-center">
            <img src="./images/icon.png" alt="" />
            <h2 class="text-3xl font-bold">Oops!! Sorry, There is no<br/> content here</h2>
          </div>
        `;

      // Change grid columns to 1
      cardContainer.classList.remove("md:grid-cols-2", "lg:grid-cols-4");
    } else {
      // Reset grid columns to default value

      cardContainer.classList.add("md:grid-cols-2", "lg:grid-cols-4");
    }

    tubeData.forEach((data) => {
      const card = document.createElement("div");
      card.classList = `card  bg-base-100 shadow-xl`;

      const publishDate = data?.others?.posted_date;
      const publishHour = Math.floor(parseInt(publishDate) / 3600);
      const publishMin = Math.floor(parseInt(publishDate % 3600) / 60);

      card.innerHTML = `
            <figure class="relative">
                <img
                class="w-full lg:w-[300px] h-[200px]"
                    src=${data?.thumbnail}
                />
                ${
                  publishDate
                    ? `<span class='absolute right-2 bottom-4 text-white bg-black p-2 rounded-md text-sm'>${publishHour} hrs and ${publishMin} min ago </span>`
                    : ""
                }
                
            </figure>
            <div class="card-body">
                <div class="flex gap-3">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                        <img src=${data?.authors[0]?.profile_picture} />
                        </div>
                    </div>

                    <div>
                        <h2 class="text-xl font-bold">${data?.title}</h2>
                        <div class="pt-2 flex gap-4 items-center">
                            <h5 class="text-sm text-gray-500">${
                              data?.authors[0]?.profile_name
                            }</h5>
                            ${
                              data?.authors[0]?.verified
                                ? "<i class='text-blue-600 fas fa-certificate'></i>"
                                : ""
                            }
                        </div>
                        <p class="text-sm text-gray-500">${
                          data?.others?.views
                        } views</p>

                    </div>
                </div>
            
            </div>
      `;
      cardContainer.appendChild(card);
    });

    console.log(tubeData);
  } catch (err) {
    console.log("ERROR:", err);
  }
  console.log(categoryId);
};
getCategory();
getTubeData("1000");
