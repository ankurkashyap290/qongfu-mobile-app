import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styles from '../../styles/settings.style';
import PageLayout from '../../layout/PageLayout';
import {Paragraph} from 'react-native-paper';

const AboutUs = ({}) => {
  return (
    <PageLayout>
      <View style={styles.descriptionContainer}>
        <Text style={styles.aboutUsHeading}>Birth of Qongfu</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu was born in early 2018 in a little town north of Manila,
            Philippines.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            It’s founder, Mohammed Al Fahad, a Bahraini national at the age of
            29, had finally decided to quit his career in the corporate world to
            pursue his passion in creating disruptive technologies that can
            change the way people do things for the better. He decided to meet
            his good friend, Keith Manilla, a UI/UX designer and full stack
            developer to help him develop the project. For the first couple of
            days they were brainstorming and developing initial designs, whereas
            Mohammed suggested they start training to stay healthy and
            motivated.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            They found it difficult to decide where to train and what were the
            prices to join nearby health clubs with the internet sources
            available. That became the moment of realization and pivot point to
            the birth of Qongfu!
          </Text>
        </Paragraph>
        <Text style={styles.aboutUsHeading}>True Meaning of Qongfu</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu (功夫), commonly known as “Kung Fu” or more accurately as
            “Gong Fu” is a Chinese term which literally translates into
            “Skillful work attained over Time spent”. Gong (功) being “Skillful
            work” or “Hard Training”, and Fu (夫) being “time spent”. The
            accurate use of the word is “Skills Acquired”, for example: The
            person has great Qongfu in the way they think or do a certain
            activity. Qongfu can be used for any skill learned or practiced over
            a period of time. Whether it is boxing, making tea, eloquent speech
            or proper posture. The beauty of the word Qongfu is how it can
            encompass all forms of skill that can be learned and perfected. It
            can be an individual or collective accomplishment of skills acquired
            through discipline, hard work and practice. Qongfu canbe understood
            as growth and progress in anyform of practice.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            The way the word “Kung Fu” is used today to mean Martial Arts is not
            totally correct. The actual Chinese word for Martial Arts today is
            “Wu Shu” (武术). Wu (武) being “War” or “Warring”, and Shu (术)
            being “Art”, together “Warring Art” or “The Art of War” aka “Martial
            Arts”.
          </Text>
        </Paragraph>
        <Text style={styles.aboutUsHeading}>Our Philosophy</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu is a call for transformational growth, it is a movement, a
            revolution. We believe humanity over the centuries has attained an
            abundance of knowledge from all corners of the earth in various
            areas of life, from physical health, to mental well-being,
            nutrition, herbal and preventative medicine as well as many other
            arts and sciences that serve us as a species.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Qongfu has made it its mission to compile and organize this valuable
            knowledge passed through the masters of time, and make it
            readilyavailable to its users to enrich their development on their
            quest of self-discovery and growth. How? We believe supporting the
            health and fitness community today by facilitating the technologies
            readily available to us there is much positive change that can be
            done for the present and future generations. There is a saying from
            Olden Arabia: “Al Aql Al Saleem fi Al Jism Al Saleem”, which
            literally translates to “The Healthy mind resides in the Healthy
            Body” and is equivalent to the Ancient Chinese Saying: “Sound Mind,
            Sound Body”.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            By bringing the community together, building an eco-system to
            sustain its growth and fueling its motivation towards a common goal,
            we can achieve Qongfu’s vision “Healthy Minds, Healthy Bodies”.
          </Text>
        </Paragraph>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            Join us, join the movement!
          </Text>
        </Paragraph>
        <Text style={styles.aboutUsHeading}>Our Mission</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            To inspire people to realize the highest levels of their potential
            in body, mind and spirit.
          </Text>
        </Paragraph>
        <Text style={styles.aboutUsHeading}>Our Vision</Text>
        <Paragraph style={styles.paragraph}>
          <Text style={styles.descriptionText}>
            The development of healthy individuals and communities, which will
            in turn create positive changes in their personal lives and
            economies as a whole.
          </Text>
        </Paragraph>
      </View>
    </PageLayout>
  );
};

export default AboutUs;
