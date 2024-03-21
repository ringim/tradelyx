import {Platform, StyleSheet} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../../../constants';

export default StyleSheet.create({
  container: {
    marginHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  container2: {
    marginTop: SIZES.semi_margin,
    marginHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
    padding: SIZES.radius,
    backgroundColor: COLORS.Neutral10,
    // marginBottom: 50,
  },
  container3: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    marginHorizontal: SIZES.base,
    justifyContent: 'space-between',
  },
  container4: {
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Neutral10,
    borderRadius: SIZES.radius,
    padding: SIZES.semi_margin,
    marginBottom: 50,
  },
  destCont: {
    marginTop: 5,
    justifyContent: 'center',
    padding: SIZES.base,
    width: 32,
    height: 32,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary10,
  },
  destName: {
    paddingTop: 4,
    ...FONTS.body3,
    color: COLORS.Neutral6,
  },
  row: {
    marginTop: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
  subCont: {flex: 1, marginLeft: SIZES.radius, justifyContent: 'center'},
  text: {
    paddingTop: 4,
    ...FONTS.body3,
    color: COLORS.Neutral6,
  },
  text2: {
    ...FONTS.h3,
    color: COLORS.primary1,
    letterSpacing: -1,
    paddingTop: SIZES.base,
  },
});
