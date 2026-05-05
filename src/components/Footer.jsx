import React from 'react'

const Footer = () => {
  return (
    <div>
        <section class="row bg-primary">
            {/* <!-- child 1 --> */}
            <div class="col-md-3">
                <div class="card shadow bg-danger">
                    <h2 class="text-center text-light">About Us</h2>
                    <p class="text-light">Our main store is located on gtc bulding on the 5th floor</p>
                </div>
            </div>
            {/* <!-- child 2 --> */}
            <div class="col-md-4">
                <h2 class="text-light text-center">Contact us</h2>
                <form action="">
                    <input type="email" placeholder="Enter your email " class="form-control"/><br/>
                    <textarea name="" id="" class="form-control" placeholder="Leave a comment"></textarea><br/>
                    <input type="submit" value="Send Message" class="btn btn-outline-danger"/>
                </form>
            </div>
            {/* <!-- child 3 --> */}
            <div class="col-md-4">
                <h2 class="text-center text-light">Stay connected On</h2>
                <a href="https:/facebook.com">
                    <img src="images/fb.png" alt="fb"/>
                </a><br/>
                <a href="https:/instagram.com">
                    <img src="images/in.png" alt="ig"/>
                </a><br/>
                <a href="https:/x.com">
                    <img src="images/x.png" alt="x"/>
                </a><br/>
                <p>You can get in touch with us at our social media platform @iphonestore</p>
            </div>
        

        </section>
    </div>
  )
}

export default Footer