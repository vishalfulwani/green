import React from 'react';
import styles from '../style/home.module.css'; // Import CSS module

const Page = () => {
  return (
    <>
    <section className={styles.treePlantationSection}>
      <div className={styles.treePlantationSectionContainer}>
        <h2 className={styles.heading}>Plant a Tree from the Comfort of Your Home</h2>
        <p className={styles.descreption}>Make a difference without leaving your house and receive a personalized certificate.</p>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src="https://treesunlimitednj.com/wp-content/uploads/Selecting-Trees-by-Shape.jpg" alt="Choose Tree" />
            <h3>Choose Your Tree</h3>
            <p>Select the type of tree you wish to plant. Each tree offers unique benefits and characteristics, contributing to the environment and your personal green space.</p>
          </div>
          <div className={styles.card}>
            <img src="https://tse1.mm.bing.net/th?id=OIP.5nJzQeehuqQyzcbU15FviQHaEh&pid=Api&P=0&h=180" alt="Make a Donation" />
            <h3>Make a Donation</h3>
            <p>Your donation covers the planting and ongoing care of the tree, helping it grow and thrive. This generous support ensures a lasting environmental impact</p>
          </div>
          <div className={styles.card}>
            <img src="https://cdn.slidemodel.com/wp-content/uploads/21672-01-award-certificate-template-for-powerpoint-16x9-3.jpg" alt="Receive Certificate" />
            <h3>Get Your Certificate</h3>
            <p>After your tree is planted, you'll receive a personalized certificate with details about your tree's species, location, and its growth journey and impact.</p>
          </div>
          <div className={styles.card}>
            <img src="https://tse3.mm.bing.net/th?id=OIP.QbNt9-K1ZoegDjd5xrZP-wHaEk&pid=Api&P=0&h=180" alt="Track Your Tree" />
            <h3>Track Your Tree</h3>
            <p>Get regular updates on your tree's growth and impact. You'll receive photos and information about the tree's location and its contribution to the environment.</p>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <a href="/plant-tree" className="button button-green">Plant a Tree Now</a>
          <a href="/learn-more" className="button button-outline">Learn More</a>
        </div>
      </div>
    </section>


<section className={styles.donationUtilization}>
      <div className={styles.donationUtilizationContainer}>
        <h2 className={styles.heading}>How Your Donation Nurtures Growth</h2>
        <p className={styles.descreption}>Your generous donation plays a crucial role in ensuring the success of every plant. Here's how we use your contribution to nurture and grow your chosen tree or plant:</p>
        
        <div className={styles.steps}>
          <div className={styles.step}>
            <h3>Preparation</h3>
            <p>We use your donation to prepare the soil and select the ideal location for planting. This includes testing soil quality and adding necessary nutrients to create a thriving environment.</p>
          </div>
          <div className={styles.step}>
            <h3>Planting</h3>
            <p>Our team carefully plants your tree, ensuring proper spacing and depth. We use high-quality saplings and planting techniques to give your tree the best start.</p>
          </div>
          <div className={styles.step}>
            <h3>Ongoing Care</h3>
            <p>Your donation supports regular maintenance, including watering, fertilization, and pest control. We monitor the plant’s health and make adjustments as needed to promote robust growth.</p>
          </div>
          <div className={styles.step}>
            <h3>Growth Monitoring</h3>
            <p>We track the growth and development of each plant, ensuring it receives the care it needs to mature. Your contribution helps fund this ongoing monitoring and adjustment.</p>
          </div>
          <div className={styles.step}>
            <h3>Impact Reporting</h3>
            <p>You’ll receive updates on your plant’s progress, including photos and details about its development. This transparency shows how your donation is making a difference.</p>
          </div>
        </div>

        <div className={styles.callToAction}>
          <p>Want to see your impact firsthand? Contribute today and be part of our journey in nurturing the environment.</p>
          <a href="/donate" className='button button-green'>Donate Now</a>
        </div>
      </div>
    </section>


    </>

  );
}

export default Page;
