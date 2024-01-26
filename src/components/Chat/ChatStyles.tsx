import {Platform, StyleSheet} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingRight: 10,
    paddingLeft: 10,
    maxWidth: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  subCont: {flex: 1, marginLeft: SIZES.base, justifyContent: 'center'},
  leftContainer: {
    backgroundColor: COLORS.secondary4,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    marginBottom: 5,
    marginLeft: SIZES.radius,
    marginRight: 'auto',
  },
  rightContainer: {
    backgroundColor: COLORS.lightYellow,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    marginLeft: 'auto',
    marginRight: SIZES.radius,
    marginBottom: 5,
  },
  chatTimeCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  root: {
    paddingVertical: SIZES.radius,
    backgroundColor: COLORS.Neutral9,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.base,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    height: 50,
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    marginHorizontal: SIZES.base,
    color: COLORS.black,
  },
  icon: {
    marginHorizontal: 5,
  },
  sendImageContainer: {
    flexDirection: 'row',
    marginHorizontal: SIZES.semi_margin,
    marginBottom: SIZES.semi_margin,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: COLORS.Neutral7,
    borderRadius: 10,
    marginLeft: 'auto',
    width: 150,
    marginRight: 50,
  },
  sendFileContainer: {
    paddingHorizontal: 4,
    paddingVertical: SIZES.radius,
    flexDirection: 'row',
    marginHorizontal: SIZES.radius,
    marginBottom: SIZES.semi_margin,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  row: {flexDirection: 'row'},
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 35,
  },
  progressContainer: {
    position: 'absolute',
    top: '38%',
    left: '37%',
    backgroundColor: COLORS.Neutral1,
    opacity: 0.8,
    padding: SIZES.base,
    borderRadius: 50,
  },
  progressText: {
    color: COLORS.secondary1,
    ...FONTS.cap1,
    fontWeight: 'bold',
  },
  msgReplyCont: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fileNameTxt: {
    padding: 6,
    ...FONTS.cap1,
    fontWeight: 'bold',
    textAlign: 'left',
    color: COLORS.primary1,
  },
  sentIcon: {
    width: 13,
    height: 13,
    top: 3,
  },
  spaceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
