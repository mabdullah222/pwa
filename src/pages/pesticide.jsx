// {/* <div className="rounded  box-border shadow-lg p-2 m-3">
//                                 <h1 className="text-3xl text-lime-950 mt-4 ml-2">Diseases</h1>
//                                 <div className="grid grid-cols-2 gap-4 grid-rows-2 p-2">
//                                         <div onClick={() => toggleDescShown1()}>
//                                                 <DiseaseCard name={diseaseData.disease1.name} images={diseaseData.disease1.images} />
//                                         </div>

//                                         <div onClick={() => toggleDescShown2()}>
//                                                 <DiseaseCard name={diseaseData.disease2.name} images={diseaseData.disease2.images} />
//                                         </div>

//                                         <div onClick={() => toggleDescShown3()}>
//                                                 <DiseaseCard name={diseaseData.disease3.name} images={diseaseData.disease3.images} />
//                                         </div>

//                                         <div onClick={() => toggleDescShown4()}>
//                                                 <DiseaseCard name={diseaseData.disease4.name} images={diseaseData.disease4.images} />
//                                         </div>
//                                 </div>

//                                 {descShown1 ? <div onClick={() => toggleDescShown1()}  className=" bg-neutral-800 bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                                         <div className="mt-20 h-3/4 rounded bg-gray-100 py-6 pt-0 m-6">

//                                                 {/* <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
//                                                         <div class="carousel-inner">
//                                                                 <div class="carousel-item active">
//                                                                         <img className="d-block w-100" src={diseaseData.disease1.images[0]} alt="disease1" />
//                                                                 </div>
//                                                                 <div class="carousel-item">
//                                                                         <img className="d-block w-100" src={diseaseData.disease1.images[1]} alt="disease1" />
//                                                                 </div>
//                                                                 <div class="carousel-item">
//                                                                         <img className="d-block w-100" src={diseaseData.disease1.images[2]} alt="disease1" />
//                                                                 </div>
//                                                         </div>
//                                                         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//                                                                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                                                                 <span class="visually-hidden">Previous</span>
//                                                         </button>
//                                                         <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//                                                                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                                                                 <span class="visually-hidden">Next</span>
//                                                         </button>
//                                                 </div> */}

//                                                 <img className=" rounded w-full h-1/5" src={diseaseData.disease1.images[0]} alt="disease1" />
//                                                 <p className="mx-3 p-1 m-4 text-xl text-lime-900">{diseaseData.disease1.name}</p>
//                                                 <p className="mx-3 p-3 pt-0 pl-5 ">{diseaseData.disease1.description}</p>
//                                         </div>
//                                 </div> : null}

//                                 {descShown2 ? <div onClick={() => toggleDescShown2()} className=" bg-neutral-800 bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                                         <div className="mt-20 h-3/4 rounded bg-gray-100 py-6 pt-0 m-6">
//                                                 <img className=" rounded w-full h-1/5" src={diseaseData.disease2.images[0]} alt="disease2" />
//                                                 <p className="mx-3 p-1 m-4 text-xl text-lime-900">{diseaseData.disease2.name}</p>
//                                                 <p  className="mx-3 p-3 pt-0 pl-5 ">{diseaseData.disease2.description}</p>
//                                         </div>
//                                 </div> : null}

//                                 {descShown3 ? <div onClick={() => toggleDescShown3()} className=" bg-neutral-800 bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                                         <div className="mt-20 h-3/4 rounded bg-gray-100 py-6 pt-0 m-6">
//                                                 <img className=" rounded w-full h-1/5" src={diseaseData.disease3.images[0]} alt="disease3" />
//                                                 <p className="mx-3 p-1 m-4 text-xl text-lime-900">{diseaseData.disease3.name}</p>
//                                                 <p  className="mx-3 p-3 pt-0 pl-5 ">{diseaseData.disease3.description}</p>
//                                         </div>
//                                 </div> : null}

//                                 {descShown4 ? <div onClick={() => toggleDescShown4()} className=" bg-neutral-800 bg-opacity-90 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                                         <div className="mt-20 h-3/4 rounded bg-gray-100 py-6 pt-0 m-6">
//                                                 <img className=" rounded w-full h-1/5" src={diseaseData.disease4.images[0]} alt="disease4" />
//                                                 <p className="mx-3 p-1 m-4 text-xl text-lime-900">{diseaseData.disease4.name}</p>
//                                                 <p  className="mx-3 p-3 pt-0 pl-5 ">{diseaseData.disease4.description}</p>
//                                         </div>
//                                 </div> : null}
//                         </div> */}