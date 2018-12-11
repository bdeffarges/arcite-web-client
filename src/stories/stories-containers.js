import React from 'react';
import { storiesOf } from '@kadira/storybook';

import decorator from './decorator';

import { Heading2 } from '../components/uikit/typography';
import { Base, Section, DarkSection, Container } from '../components/uikit/containers';


export default () => {
  storiesOf('Containers', module)
  .add('Base container', () => (
    <Base>
      <Heading2>Base Container</Heading2>
      <p>
      This is a base container with a paragraph in it.
      The purpose of the base container is to apply basic styles to your app.
      </p>
    </Base>
  ))
  .addDecorator(decorator)
  .add('Section', () => (
    <Section>
      <Heading2>Section</Heading2>
      <p>A section has a width of 100% and adds enough spacing to make it look pretty</p>
    </Section>
  ))
  .add('Dark section', () => (
    <DarkSection>
      <Heading2>Dark Section</Heading2>
      <p>A dark section is like a section, but on dark background</p>
    </DarkSection>
  ))
  .add('Container', () => (
    <Container>
      <Heading2>Container (responsive)</Heading2>
      <p>
        A container has a maximum width depending on the size of the device.
        To illustrate this, you can see a long text below:
      </p>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad repellendus nesciunt rerum
      quas nulla accusamus libero esse sunt voluptatum tenetur fugiat fuga cupiditate corrupti
      voluptate quaerat commodi, inventore culpa deleniti, aliquid, magni, magnam tempore
      repudiandae ex neque? Necessitatibus inventore libero, debitis tempore aspernatur. Tempore sed
      numquam tempora illo facere perspiciatis consequuntur placeat ipsa dolore quam. Ipsam aut qui
      possimus accusamus. Nostrum animi porro recusandae maxime nemo. Quam aut assumenda aspernatur
      modi neque ducimus quisquam, laboriosam voluptatem vitae esse eaque hic nostrum consectetur
      similique expedita ipsa repellat maxime adipisci architecto ea asperiores quod recusandae
      atque. Hic maxime voluptatum quisquam reiciendis mollitia fuga consequuntur magni numquam,
      aliquid voluptates dolorum distinctio tempora, praesentium iure corporis nobis? Repellat atque
      officiis iste, ad vitae. Perferendis tempora recusandae iure asperiores obcaecati. Consectetur
      dolorem amet nulla labore. Qui expedita mollitia et nam, sunt voluptas pariatur repellendus.
      Quaerat, nemo sint autem, eos ut ipsum debitis quisquam reiciendis fugiat veritatis vel alias
      recusandae id dolorum sed odio voluptate cum dignissimos iusto sapiente, aspernatur totam.
      Dolore, nisi, natus! Voluptas iusto autem repudiandae eaque numquam nobis aliquid vero odit
      sed. At optio quisquam molestias unde atque aliquid fuga, sequi provident repellendus dolores,
      vel rerum necessitatibus est a corporis laboriosam iusto enim, veniam non. Explicabo
      dignissimos quasi officia minus. Quia asperiores, odio doloribus ipsa distinctio. Deleniti,
      distinctio, ea. Aliquid reprehenderit eius tempora dignissimos vel, a repudiandae corporis qui
      aliquam excepturi dicta, itaque deleniti voluptatibus quam. Quam explicabo fugiat illo
      architecto necessitatibus soluta officia praesentium nam reiciendis deleniti voluptatibus
      reprehenderit, hic quia velit delectus minus saepe modi ullam eligendi, dolorem, corporis
      magni voluptatem ipsa impedit. Fugit pariatur, culpa nobis perferendis, aspernatur nesciunt
      mollitia, libero excepturi illum sint laboriosam tenetur blanditiis facilis iusto vitae.
      Repellat iste tempore, molestiae iure esse, in nisi deserunt unde quod id natus architecto
      eaque aliquid et libero, mollitia, magni earum eum eveniet sequi dolores ullam velit nesciunt.
      Vero enim, tempore. Quaerat voluptatum, quas vero et dolorem, minima cupiditate ipsam eum
      distinctio, temporibus itaque. Nobis minima illo aspernatur excepturi, praesentium consequatur
      pariatur, accusamus architecto incidunt! Et repellat, aut pariatur. Vel laborum nam labore
      beatae maiores cumque maxime nulla repellat dolore atque saepe dolorum fugit praesentium rem,
      aperiam sapiente nisi commodi ratione, quos architecto. Debitis vitae dolorem eligendi fugit a
      eum, voluptas nulla saepe consequatur omnis unde sequi! Doloremque porro illo, iure? Libero
      doloribus, eius beatae officia, aperiam ex aut placeat illum vitae sapiente nam? Officiis
      molestiae expedita ad, enim aut quae voluptate officia harum quaerat ipsam asperiores, amet ea
      illo cupiditate inventore architecto quisquam explicabo molestias iste necessitatibus rem,
      fuga eius natus excepturi modi. Ullam, explicabo! Quidem quis, modi adipisci aliquid enim
      necessitatibus ducimus quam harum rem voluptas, cupiditate quasi, distinctio esse nam ex
      suscipit! Tenetur, nemo, odit. Rerum dolorem magnam, molestiae voluptatum voluptatibus rem
      officia fugiat sapiente consequatur, aliquam, ullam fuga alias magni possimus pariatur eveniet
      debitis quo dolore dolorum. Rerum architecto ad, amet accusamus, nam praesentium et voluptatem
      iste nulla perspiciatis error possimus esse doloribus quae voluptatum, beatae quis quidem non
      earum explicabo. Nihil repellat necessitatibus doloremque incidunt. </p>
    </Container>
  ));
};
