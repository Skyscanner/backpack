/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { colorGray300 } from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import CenterDecorator from '../../storybook/CenterDecorator';
import BpkCarousel, { BpkCarouselItem } from './index';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignSelf: 'center',
    width: 350, // eslint-disable-line backpack/use-tokens
    height: 233, // eslint-disable-line backpack/use-tokens
  },
});

const renderImages = useFullComplement => {
  let images = [
    'https://images.unsplash.com/photo-1496348323715-c11f0fc6aeed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c0ca46c79b905ff053eb904a86c3b1cc&auto=format&fit=crop&w=1294&q=80',
    'https://images.unsplash.com/photo-1501396682541-5c1e8350b1a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=291d815857dd65794e545d68ea14e276&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1507760094980-7fb3009e2f44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1728ff9791a421ae0a257ba7a836ebe9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1508084133331-26eb27087434?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7e15b449ea763ce5d69524d8d7a27587&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1515719032424-815d6656f0a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2cb28b9c8e3e4c43b889200c23ab942c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523268755815-fe7c372a0349?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=78f4a9da162471fff0acce3b5be33393&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1517254021747-023c8052c961?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8139d7c0bf3747bfe3a328d79abedc38&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523364583621-23af08364dc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=41ac7c82c76e28433baafbb49deeb4e5&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1528150395403-992a693e26c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0651fee03ef0f9dad95014a45adf898a&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1494476224464-6ade4249561f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8307109aec21f6e7f2d991559a9835b3&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1493809161914-477bd28bfb68?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1d6a113e734c52e0c643c5d1d5e5b0c4&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1497398276231-94ff5dc90217?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f0ce3550fc40a23bb71bda77cd496273&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523622805393-a76e08d71e79?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dbd097f5f88cda93dc1b0c72bde6cd27&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1512249167167-32fb4f8b17f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=362c17128337ac05c561ce8acf2b299e&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1511702771955-42b52e1cd168?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0b8ce1412e0f8646fa9f794963ab897e&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519458524098-335b2a5747b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=edd63ae6de5c3a3573b423bfcec62469&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1525302910205-c63cfa45fc02?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f545c0eb680bff357c2502cf773c32a&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526030557300-6092b4100e44?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c9638a46e4cb76a170395f88fe67f2d&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506126944674-00c6c192e0a3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffcbd5766dee174472d78bcc388c22f0&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1516956431828-b10b67f654d0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1abfd58b74a89775f1c75a22cc8b1605&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506506447188-78e2a1051d9e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6f7806c0a01af0521ed3e8062ce137d2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1475809913362-28a064062ccd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8744bee8594c81cac39bc702521b0acc&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1527862399980-b92febc270b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1e171d0a6f3ff8c0d168e972c5009493&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=46133220eb9fb8b0d0f308e6c2d501ca&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1513223848047-2456e15b4f7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebc05061b3e2a4fb76d2552cd94308a0&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1504433374832-4fcf45f40967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=84d5ddcf804b74c6929073ebf76b7c95&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1502637827914-d8064ccfc299?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a919db2bb1db4c0de1450a125182fa8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1493546109643-cd9fda7b38fe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b4d5ccc45de5d32f03cd22958c6f6b85&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef83ecf505188d03ab8002e57706b285&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526353142379-8e22db12876c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7aa16a5ce61f1de9dd020faac04e0275&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1493832801686-357ba6c950b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b5a14e905bd04bd1fca0d6a5ebce71e8&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1527506528778-f6c47f1a9bfb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d8d04cbdca73d857d2fdf3a05d5d5d9c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1505881502353-a1986add3762?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=79770836c467adb5a78c392855fb1557&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506797336658-b1135cfa5ff4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de35799f7f285db4ae518ae6a9983471&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1522096388066-d510d6aa9e9f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f65c9a79472dff7362828e64a1c04863&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523891724653-34d9c7e5c075?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c34be8f342a22aae41139e72e02176ce&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1522747345933-e6b14ae16e0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=59ad156363235222328305f4d44aaffb&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1507637246364-d8fce4a9850a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00dbdf5c6801d1b76bf753ae9569cbca&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1515736123553-9c5276c4ef34?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a59b6b47ddd9a15ba1f7f2039e1bce10&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519672943034-e7645f4e6e4a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b928dcd881784ab19c9d485631045ec2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1521904074724-1073e2b17154?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9b569200ed968379f93185bdeafd2822&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1494074734099-c4ec0c45687a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f18b2bf25abbaeddbe5ea1f9dae1ff85&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506153456649-ed4ed08d1e0c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d631d4911c05368cf6699b828116473d&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1516186049182-b29897c525d1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=efb3103964aaa561432d3d718ab94e50&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1503044600630-60c01a3ef702?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2af2de59a223d12b162c3a1f887659c4&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1505244802805-bb5f98ffe46c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2a0a5b4905c3f684da60fc0cc891848&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1512232941074-f617e1476738?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b8eff88bd084672bf1d3f3ed7aa48a2f&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1517613367530-b0982b0d47e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ec661cd4e6e52495e5ceae7a20c41b2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1514561064005-2bac60d9f7ea?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a0f1e9785e9dc8e8d31607bf7172643&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1494223416915-42e9c87bfb26?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5adefc44833648a876f1c87fbddf219a&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1509781200547-56ffc785bd2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a42dbb588b1647e8d0c4e1c8fc3a5f26&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1491900177661-4e1cd2d7cce2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0e5f7a670b5cd3ff8bbc7b21ef4e4461&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1498263382026-c65d01dad017?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=39dfa4588454cba293783e9f5d45f969&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1507358522600-9f71e620c44e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9606de2cffd6c619093871ef2d1c0e6f&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1507010228826-fd02d8c83ddf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60c658450948b1b568b15cb0f4bacb32&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1521579880562-101f47676ee1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b149040db05a369f39ef7d6f0170941&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1520420097861-e4959843b682?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a76802ff83a847d60d945e4f44cd241&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526642808326-d0ccb242ff3f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6357c46bd605e885850219f2827cea21&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1511789421096-2b3be5f1f623?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e2f9b6ddc7b729ef90fde26207e2f26&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1508157323745-9469f9ec51b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=16a6845f6b340c8c3b209983f50227ff&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1511090724501-e01da99e9869?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4617a9e73808b37e5023619c796df0db&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518847076759-2c8d95183cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7bff3f4673b9d8976c9ee82d61266d3d&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1524701208119-e91fc2e4c8e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7c96d9ba8dc2a6fcf0ceaed06954e42&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1494368308039-ed3393a402a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5833de7a1cd089654a83634831a2cd40&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1495933624430-639a9a9f2b1b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6e1a3b1dea1669a568fb089359c54376&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=477ae5a62fd5ade3f1e3a08c013af882&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1522729872936-72dc3efa6546?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3143a54b6beba2eb17f6a1f09e029994&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1524882988266-3872a15d16ac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a27b3b8c9c3b77ee37c398045e661203&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1496307379113-88a4db6434a8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2aee50c69877a7ef323393a5ab9b68d2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1506283118382-440af810d53d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4bda3474313ced99280298eeb571890e&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1508182314998-3bd49473002f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af394daae4bdbc4a95dc2204984b790d&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1517589364675-a7250616e343?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=68d0693b6f901e5dabb5ef91d5da6b5c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518721998665-f922ee0fddb6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d279025c4b5d0a7c387387e1d009189c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1490481920145-fc78891bbb99?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=03e12dd0d45abebf33214447553b37f2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b66e9d835de3873a86d1cec996a1af06&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1515620073730-d1df193ee346?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=84fae5b5dc1c8798594ee4b238573ddc&auto=format&fit=crop&w=920&q=80',
    'https://images.unsplash.com/photo-1524820197278-540916411e20?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93dfd06cba57eb3ed5363df7d1934455&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526364060191-dde130491ec8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11ddea0835059bc5276769a80c40fbcf&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526028034489-f76e5a422446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f191e636831750dc891d0713bd3b98aa&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526228876584-6c98e3221d27?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=558d07676842e56b2b2cfafc1b1feb1c&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1492835777706-c28d58a66f4f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44ab3d42a8f7702601babbc07d2b5586&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1509123825938-c6766eb401bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=66580f390176f0f4113f4c2b5f518e66&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1508245949414-8cb44b36c1e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2138b3ce94e1b641dec76247b7a7a7cc&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1514828260103-1e9bf9a58446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f36a98f5f1b150a523b924915c1544a5&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1510041883570-1c5b27d85cb8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=01c289e0c299345b66298cb5f62d37ea&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=afd6ee375c4fe6ef1e055cda436bb949&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1512545382144-4e81274f633d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a0e8f30787d6c418f791891f9778b17&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519255122284-c3acd66be602?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e04961056fdf4f059220b38f43dff1de&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1519827737530-b255e4d1d0af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=adbba1760be6ef305d1532a3c626f9c1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1511316652-1a5eed7732e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc260c3bd89b239ddc38cd3f3a1ba8c2&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1521953793652-39ff7b30d400?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=187282855273f92db1d0f65835ba8f60&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1523396206913-a003efa7861b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=99038251fa0ddd1d310a1d659ae0047b&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1525536442945-13bd56f1f3ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98fdff8bd301f22bf90116eea6f89ac4&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1495316414496-347ed93d0223?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50de4203cca6a087ec5a369e5ff5bb3e&auto=format&fit=crop&w=800&q=60',
  ];
  if (!useFullComplement) {
    images = images.slice(0, 5);
  }
  return images.map(uri => (
    <BpkCarouselItem key={uri}>
      <Image style={{ width: '100%', height: '100%' }} source={{ uri }} />
    </BpkCarouselItem>
  ));
};

const accessibilityLabel = (page, total) => `${page} of ${total}`;

storiesOf('react-native-bpk-component-carousel', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <BpkCarousel style={styles.view} accessibilityLabel={accessibilityLabel}>
      {renderImages()}
    </BpkCarousel>
  ))
  .add('Multiple elements', () => (
    <BpkCarousel accessibilityLabel={accessibilityLabel} style={styles.view}>
      <BpkCarouselItem style={[styles.page, { backgroundColor: colorGray300 }]}>
        <BpkText textStyle="xl"> View 1 </BpkText>
      </BpkCarouselItem>
      <BpkCarouselItem>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri:
              'https://content.skyscnr.com/96508dbac15a2895b0147dc7e7f9ad30/canadian-rockies-canada.jpg',
          }}
        />
      </BpkCarouselItem>
    </BpkCarousel>
  ))
  .add('Without indicators', () => (
    <BpkCarousel
      accessibilityLabel={accessibilityLabel}
      style={styles.view}
      showIndicator={false}
    >
      {renderImages()}
    </BpkCarousel>
  ))
  .add('Perf: 95 images in carousel', () => (
    <BpkCarousel style={styles.view} accessibilityLabel={accessibilityLabel}>
      {renderImages(true)}
    </BpkCarousel>
  ));
