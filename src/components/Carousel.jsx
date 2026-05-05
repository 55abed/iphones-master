import React from 'react'

const Carousel = () => {
    return (
        <section class="row">
            <div class="col-md-12">
                {/* <!-- a division containing carousel content  --> */}
                <div class="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    {/* <!-- division containing images  --> */}
                    <div class="carousel-inner">
                        {/* <!-- div with image 1 --> */}
                        <div class="carousel-item active">
                            <img src="images/carousel1.jpg" alt="slide1" width="100%" style={{ height: 500 }} />
                        </div>
                        {/* <!-- div with image 2  --> */}
                        <div class="carousel-item">
                            <img src="images/carousel2.jpg" alt="slide2" width="100%" style={{ height: 500 }} />
                        </div>
                        {/* <!-- div with image 3  --> */}
                        <div class="carousel-item">
                            <img src="images/carousel3.jpg" alt="slide 3" width="100%" style={{ height: 500 }} />
                        </div>
                        {/* <!-- div with image 4 --> */}
                        <div class="carousel-item">
                            <img src="images/carousel4.jpg" alt="slide 4" width="100%" style={{ height: 500 }} />
                        </div>
                    </div>
                    {/* <!-- previous control  --> */}
                    <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-dark"></span>
                    </a>
                    {/* <!-- Next control  --> */}
                    <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-dark"></span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Carousel