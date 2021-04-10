export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "이메일은 필수 사항입니다."
  if (!re.test(email)) return '이메일 형식이 아닙니다.'
  return ''
}
